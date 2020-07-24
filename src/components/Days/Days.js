import React, { useState } from 'react';
import Day from '../Day';
import Modal from '../UI/Modal';
import Meeting from '../Meeting';
import MeetingForm from '../MeetingForm';
import { isToday, monthsText, compareDates, addZero } from '../../helper';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import './Days.css';

const Days = () => {
  const [dayMeetings, setDayMeetings] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [createMeetingF, setCreateMeetingF] = useState(false);
  const meetings = useSelector(state => state.meetings,shallowEqual)
  const date = useSelector(state => state.date);
  const dispatch = useDispatch();

  // Days creation
  const arr = [];
  const firstDay = (new Date(date.year, date.month)).getUTCDay(); // How many days are showing from previous month
  const prevMonthDays = 32 - new Date(date.year, date.month - 1, 32).getDate() - firstDay; // What days are showing from previous month
  const monthDays = 32 - new Date(date.year, date.month, 32).getDate(); // How many days are showing from current/active month
  const nextMonthDays = 6 - new Date(date.year, date.month, monthDays).getUTCDay(); // How many days are showing from next month
  const totalDays = firstDay + monthDays + nextMonthDays; // Sum of days from the months (prev,curr,next)
  for (let i = 1; i <= totalDays; i++) {
    let day = i - firstDay;
    let monthTemp = date.month;

    if (i <= firstDay) {
      //previous month
      day = i + prevMonthDays;
      monthTemp = date.month - 1;
    } else if (i > monthDays + firstDay) {
      //next month
      day = i - (monthDays + firstDay);
      monthTemp = date.month + 1;
    }

    const dayMeetArr = meetings.filter(m => compareDates(new Date(m.start), new Date(date.year, monthTemp, day), new Date(date.year, monthTemp, day + 1)));
    const dayMeetSorted = dayMeetArr.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
    arr.push(<Day
      day={day}
      active={i > firstDay && i <= monthDays + firstDay}
      key={'next' + i}
      today={isToday(date.year, date.month, day)}
      meetings={dayMeetSorted}
      click={() => {
        setDayMeetings(dayMeetSorted);
        setSelectedDay(day)
      }}
    />);
  }


  const deleteMeeting = (m) => {
    setDayMeetings(dayMeetings.filter(dm => dm.start !== m.start || dm.meetingRoom !== m.meetingRoom));
    dispatch({ type: 'REMOVE_MEETING', data: m });
  }
  const createMeeting = (e) => {
    e.preventDefault();
    const d = date.year + '-' + addZero(date.month+1) + '-' + addZero(selectedDay) + 'T'
    const data = {//2020-06-03T14:00:00.000Z
      start: d + e.target.start.value + ':00.000Z',
      end: d + e.target.end.value + ':00.000Z',
      name: e.target.name.value,
      meetingRoom: e.target.meetingRoom.value,
      participants: []
    }
    dispatch({ type: 'ADD_MEETING', data: data });
    const dayMeetSorted = dayMeetings.length > 0 ?
      [...dayMeetings, data].sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0)) :
      [data];
    setDayMeetings(dayMeetSorted);
    setCreateMeetingF(false)
  }

  return <>
    {arr}

    {!!selectedDay && !createMeetingF &&
      <Modal header={selectedDay + ' ' + monthsText[date.month] + ' ' + date.year} close={() => setSelectedDay(0)} showFooter btnName='Add new meeting' footer={() => (setCreateMeetingF(true))}>
        {dayMeetings.length === 0 ?
          <div>No meetings</div> :
          dayMeetings.map((m, i) => <Meeting key={i} m={m}
            remove={() => deleteMeeting(m)}
          ></Meeting>)
        }
      </Modal>}

    {createMeetingF &&
      <Modal header={'Create meeting for ' + selectedDay + ' ' + monthsText[date.month] + ' ' + date.year} close={() => { setSelectedDay(0); setCreateMeetingF(false) }}>
        <MeetingForm handleSubmit={(e) => createMeeting(e)}></MeetingForm>
      </Modal>}
  </>;
};

export default Days;
