import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTime } from '../../helper';
import './MeetingForm.css';

const MeetingForm = ({ handleSubmit, meetings }) => {

  const [errorText, setErrorText] = useState();
  const [formData, setFormData] = useState({ start: '', end: '', meetingRoom: 'Tsarevets' });
  const rooms = useSelector(state => state.meetingRooms);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const doubles = meetings && meetings.filter(m => m.meetingRoom === formData.meetingRoom &&
      ((getTime(new Date(m.start)) >= formData.start && getTime(new Date(m.end)) < formData.start) ||
        (getTime(new Date(m.end)) >= formData.start && getTime(new Date(m.end)) < formData.end)))
    if (doubles.length > 0) {
      setErrorText('Sorry, this meeting room is busy at the time');
    } else if (formData.start > formData.end) {
      setErrorText('Time does not go backwards :)');
    } else {
      setErrorText();
    }
  }, [formData, meetings]);

  return (
    <form onSubmit={handleSubmit} className='meetingForm'>
      <label>
        Name:
      <input type='text' name='name' required />
      </label>
      <label className="half">
        From:
        <input type='time' name='start' min='07:00' max='19:00' value={formData.start} required onChange={(e) => changeHandler(e)} />
      </label>
      <label className="half">
        To:
        <input type='time' name='end' min='07:00' max='19:00' value={formData.end} required onChange={(e) => changeHandler(e)} />
      </label>
      <label>
        Meeting Room
      <select name='meetingRoom' value={formData.meetingRoom} onChange={(e) => changeHandler(e)}>
          {rooms && rooms.map(r => <option value={r} key={r}>{r}</option>)}
        </select>
      </label>
      <br />
      <div className='formFooter' >
        {!!errorText ? errorText :
          <input type='submit' value='Submit' className='button' />}
      </div>
    </form>
  )
};

export default MeetingForm;
