import React from 'react';
import Day from '../Day';
import { isToday } from '../../helper';
import { useSelector } from 'react-redux';

import './Days.css';

const Days = () => {

  const date = useSelector(state => state.date);

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

    arr.push(<Day
      day={day}
      month={monthTemp}
      active={i > firstDay && i <= monthDays + firstDay}
      key={i}
      today={isToday(date.year, monthTemp, day)}
    />);
  }
 
  return arr;
};

export default Days;
