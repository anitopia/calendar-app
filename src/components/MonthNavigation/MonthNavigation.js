import React, { useState } from 'react';
import { monthsText } from '../../helper';
import Button from '../UI/Button';
import './MonthNavigation.css';
import { useSelector, useDispatch } from "react-redux";

const MonthNavigation = () => {

  const [show, setShow] = useState('none');
  const date = useSelector(state => state.date);
  let years = [];
  for(let i=-5;i<=5;i++){
    years.push(date.year+i);
  }
  const dispatch = useDispatch();
  return (
    <div className="MonthNavigation">
      <Button click={() => dispatch({ type: 'PREV_MONTH' })}>{'<'}</Button>
      <div>
        {show === 'none' && <>
          <Button click={() => setShow('month')}>{monthsText[date.month] + ' '}</Button>
          <Button click={() => setShow('year')}>{date.year}</Button>
        </>}

        {show === 'month' && monthsText.map((m, i) =>
          <Button click={() => { dispatch({ type: 'SET_MONTH', data: i }); setShow('none'); }} small key={i}>{m}</Button>)}
        {show === 'year' && years.map((y) =>
          <Button click={() => { dispatch({ type: 'SET_YEAR', data: y }); setShow('none'); }} small key={y}>{y}</Button>)}
      </div>
      <Button click={() => dispatch({ type: 'NEXT_MONTH' })}>{'>'}</Button>
    </div>
  )
};

export default MonthNavigation;
