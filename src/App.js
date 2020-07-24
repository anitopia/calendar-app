import React, { useEffect } from 'react';
import Month from './components/Month';
import MonthNavigation from './components/MonthNavigation';
import Days from './components/Days/Days';
import { useSelector, useDispatch } from "react-redux";


function App() {

  const date = useSelector(state => state.date);
  const dispatch = useDispatch();

  useEffect(() => {
    if (date&&date.month < 0) {
      dispatch({
        type: 'SET_DATE', data: {
          month: 11,
          year: date.year - 1
        }
      });
    } else if (date&&date.month > 11) {
      dispatch({
        type: 'SET_DATE', data: {
          month: 0,
          year: date.year + 1
        }
      });
    }
  }, [dispatch, date]);

  return (
    <div>
      <MonthNavigation></MonthNavigation>
      <Month >
        <Days />
      </Month>
    </div>
  );
}



export default App;
