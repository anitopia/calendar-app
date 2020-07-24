import React from 'react';
import './MeetingForm.css';

const MeetingForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className='meetingForm'>
    <label>
      Name:
      <input type='text' name='name' required />
    </label>
    <label>
      From:
        <input type='time' name='start' min='07:00' max='19:00' required />
      To:
        <input type='time' name='end' min='07:00' max='19:00' required />
    </label>
    <label>
      Meeting Room
      <select name='meetingRoom'>
        <option value='Tsarevets'>Tsarevets</option>
        <option value='Arbanasi'>Arbanasi</option>
      </select>
    </label>
    <br />
    <div className='formFooter'>
      <input type='submit' value='Submit' className='button' />
    </div>
  </form>
);

export default MeetingForm;
