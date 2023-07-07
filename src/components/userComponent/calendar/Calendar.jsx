import React from 'react'
import Calender from 'react-calendar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCalendarEventByPhtoId } from '../../../actions/calendar';


import 'react-calendar/dist/Calendar.css';
import './calendar.css';

const Calendar =({id,handelCalendarData}) => {
  const {calendars} = useSelector((state)=> state.calendars)
  const dispatch = useDispatch();
  const [value , onChange] = useState(new Date());

  useEffect(()=>{
    dispatch(getCalendarEventByPhtoId(id));
  },[id]);

  const highlightBooking = ({date})=>{
    let aCalendar = calendars?.find(aCalendar=> new Date(aCalendar.dateTime).getTime() === date.getTime());
    // console.log(date);
    if(aCalendar){
      if(aCalendar.status === "pending"){
        return 'highlight-pending'
      }
      else if(aCalendar.status === "confirmed"){
        return 'highlight-confirmed'
      }
      else if(aCalendar.status === "block"){
        return 'highlight-block'
      }
    }
    return;
  }

  return (
    <div >
        <Calender 
          onChange={(e)=>
            {
              onChange(e)
              handelCalendarData(e)
            }
          } value={value}
          tileClassName = {({date,view})=>highlightBooking({date})}
          tileDisabled = {({date})=> highlightBooking({date})}
         />
    </div>  
  );
}

export default Calendar;