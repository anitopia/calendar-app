import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import { getTime } from '../../helper';

const Day = ({ day, active, meetings, today, click }) => {
  return <div className={'day' + (!active ? ' gray' : '')+ (today ? ' today' : '')} onClick={click}>
    <div>{day}</div>
    {meetings && meetings.slice(0, 3).map((m, i) => (
      <div className='meetingLine' key={i}>{getTime(m.start) + '-' + getTime(m.end) + ' ' + m.name}</div>
    ))}
  </div>;
};


Day.propTypes = {
  day: PropTypes.number,
  active: PropTypes.bool,
  meetings: PropTypes.array,
  today: PropTypes.bool,
  click: PropTypes.func
};

export default Day;
