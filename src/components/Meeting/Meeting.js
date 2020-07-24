import React from 'react';
import { getTime } from '../../helper';
import './Meeting.css'
export const Meeting = ({ m, remove }) => (
  <div className='meeting'>
    <div>{m&&(getTime(m.start) + '-' + getTime(m.end))}</div>
    <div>
      <h3>{m&&m.name}</h3>
      <div>{m&&(m.meetingRoom + ';' + m.participants.join(','))}</div>
    </div>
    <div onClick={remove} className='remove'>-</div>
  </div>
);

export default Meeting;
