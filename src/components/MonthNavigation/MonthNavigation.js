import React, { useState} from 'react';
import { monthsText } from '../../helper';
import Button from '../UI/Button';
import './MonthNavigation.css';
import { useSelector, useDispatch } from "react-redux";

const MonthNavigation = () => {

  const [showMonths, setShowMonths] = useState(false);
  const date = useSelector(state => state.date);
  const dispatch = useDispatch();
  return (
    <div className="MonthNavigation">
      <Button click={() => dispatch({ type: 'PREV_MONTH' })}>{'<'}</Button>
      <div>
        {showMonths ? monthsText.map((m, i) =>
          <Button click={() => { dispatch({ type: 'SET_MONTH', data: i }); setShowMonths(!showMonths); }} small key={i}>{m}</Button>) :
          <Button click={() => setShowMonths(!showMonths)}>{monthsText[date.month] + ' ' + date.year}</Button>}
      </div>
      <Button click={() => dispatch({ type: 'NEXT_MONTH' })}>{'>'}</Button>
    </div>
  )
};

export default MonthNavigation;
