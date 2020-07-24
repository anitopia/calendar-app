import React from 'react';
import { daysOfWeek } from '../../helper';
import './Month.css';

const Month = (props) => (
  <div className="month">
    {daysOfWeek.map(d => <div key={d} className='monthHeader'>{d}</div>)}
    {props.children}
  </div>
);


export default Month;