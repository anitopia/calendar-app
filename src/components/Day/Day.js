
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Day.css';

import Modal from '../UI/Modal';
import Meeting from '../Meeting';
import MeetingForm from '../MeetingForm';
import { monthsText, addZero, getTime, compareDates } from '../../helper';
import { useSelector, useDispatch } from 'react-redux';



const Day = ({ day, month, active, today }) => {
  const [modalF, setModalF] = useState(false);
  const [createMeetingF, setCreateMeetingF] = useState(false);
  const meetings = useSelector(state => state.meetings);
  const date = useSelector(state => state.date);
  const dispatch = useDispatch();

  const dayMeetings = meetings.filter(m => compareDates(new Date(m.start), new Date(date.year, month, day), new Date(date.year, month, day + 1)));
  const dayMeetSorted = dayMeetings.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));

  const deleteMeeting = (m) => {
    dispatch({ type: 'REMOVE_MEETING', data: m });
  }

  const createMeeting = (e) => {
    e.preventDefault();
    const { start, end, name, meetingRoom } = e.target
    const d = date.year + '-' + addZero(month + 1) + '-' + addZero(day) + 'T'
    const data = {
      start: d + start.value + ':00.000Z',
      end: d + end.value + ':00.000Z',
      name: name.value,
      meetingRoom: meetingRoom.value,
      participants: []
    }
    dispatch({ type: 'ADD_MEETING', data: data });
    setCreateMeetingF(false);
  }
  return <>
    <div className={'day' + (!active ? ' gray' : '') + (today ? ' today' : '')} onClick={() => setModalF(true)}>
      <div>{day}</div>
      {dayMeetSorted && dayMeetSorted.slice(0, 3).map((m, i) => (
        <div className='meetingLine' key={i}>{getTime(m.start) + '-' + getTime(m.end) + ' ' + m.name}</div>
      ))}
    </div>
    {modalF && !createMeetingF &&
      <Modal header={day + ' ' + monthsText[month] + ' ' + date.year} close={() => setModalF(false)} showFooter btnName='Add new meeting' footer={() => (setCreateMeetingF(true))}>
        {dayMeetSorted.length === 0 ?
          <div>No meetings</div> :
          dayMeetSorted.map((m, i) => <Meeting key={i} m={m}
            remove={() => deleteMeeting(m)}
          ></Meeting>)
        }
      </Modal>}

    {createMeetingF &&
      <Modal header={'Create meeting for ' + day + ' ' + monthsText[month] + ' ' + date.year} close={() => { setModalF(false); setCreateMeetingF(false) }}>
        <MeetingForm handleSubmit={(e) => createMeeting(e)} meetings={dayMeetSorted}></MeetingForm>
      </Modal>}</>
    ;
};


Day.propTypes = {
  day: PropTypes.number,
  active: PropTypes.bool,
  meetings: PropTypes.array,
  today: PropTypes.bool,
  click: PropTypes.func
};

export default Day;
