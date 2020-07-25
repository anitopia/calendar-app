
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import { getTime } from '../../helper';

import Modal from '../UI/Modal';
import Meeting from '../Meeting';
import MeetingForm from '../MeetingForm';
import { monthsText, addZero } from '../../helper';
import { useSelector, useDispatch } from 'react-redux';



const Day = ({ day,month, active, meetings, today }) => {
  const [dayMeetings, setDayMeetings] = useState([]);
  const [modalF, setModalF] = useState(false);
  const [createMeetingF, setCreateMeetingF] = useState(false);
  const date = useSelector(state => state.date);
  const dispatch = useDispatch();

  const deleteMeeting = (m) => {
    setDayMeetings(dayMeetings.filter(dm => dm.start !== m.start || dm.meetingRoom !== m.meetingRoom));
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
    const dayMeetSorted = meetings.length > 0 ?
      [...meetings, data].sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0)) :
      [data];
    setDayMeetings(dayMeetSorted);
    setCreateMeetingF(false);
  }

  return <>
    <div className={'day' + (!active ? ' gray' : '') + (today ? ' today' : '')} onClick={() => setModalF(true)}>
      <div>{day}</div>
      {meetings && meetings.slice(0, 3).map((m, i) => (
        <div className='meetingLine' key={i}>{getTime(m.start) + '-' + getTime(m.end) + ' ' + m.name}</div>
      ))}
    </div>
    {modalF && !createMeetingF &&
      <Modal header={day + ' ' + monthsText[month] + ' ' + date.year} close={() => setModalF(false)} showFooter btnName='Add new meeting' footer={() => (setCreateMeetingF(true))}>
        {meetings.length === 0 ?
          <div>No meetings</div> :
          meetings.map((m, i) => <Meeting key={i} m={m}
            remove={() => deleteMeeting(m)}
          ></Meeting>)
        }
      </Modal>}

    {createMeetingF &&
      <Modal header={'Create meeting for ' + day + ' ' + monthsText[month] + ' ' + date.year} close={() => { setModalF(false); setCreateMeetingF(false) }}>
        <MeetingForm handleSubmit={(e) => createMeeting(e)} meetings={meetings}></MeetingForm>
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
