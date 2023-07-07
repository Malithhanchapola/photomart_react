import React, { useState }from 'react'
import Calendar from 'react-calendar';
import "./CalenderScreen.css"

import { useDispatch, useSelector } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import { createCalendarEvent, getCalendarEventByPhtoId } from '../../../actions/calendar';



export const CalenderScreen = () => {

  const {calendars} = useSelector((state)=> state.calendars)
  const dispatch = useDispatch();

  const [calendarData , setCalendarData] = useState({photographerId:'', userId:'', dateTime:'', status:''});
  const [value , onChange] = useState(new Date());
  const [profile,setProfile] = useState(JSON.parse(localStorage.getItem('profile')))



  useEffect(()=>{
    dispatch(getCalendarEventByPhtoId(profile.photographerId));
  },[dispatch]);

  const handelAdd = async (e) => {
    e.preventDefault();
    dispatch(createCalendarEvent({...calendarData,photographerId:profile.photographerId, dateTime:value, status:'block'}));
  }

  const highlightBooking = ({date})=>{
    let aCalendar = calendars?.find(aCalendar=> new Date(aCalendar.dateTime).getTime() === date.getTime());
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
    <div className='calendar-group'>
      <div className='calendarContainer'>
        <Calendar onChange={(e)=>{onChange(e) 
        
        console.log(e)
      
      }} value={value}
          tileClassName = {({date,view})=>highlightBooking({date})}
          tileDisabled = {({date})=> highlightBooking({date})}
        />
        {/* <ReactDatePicker   controls={['calendar']} /> */}
      </div>

      <div>
        <form>

          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" />
          </div>

          <div className="input-group">
            <label htmlFor="discription">Discription</label>
            <input type="text" id="discription" />
          </div>

          <div className='input-group'>
            <label htmlFor="time">Time</label>
            <input type="time" id="facebookName" />
          </div>

          <button onClick={handelAdd}  className="add-btn">
            Add
          </button>
          
        </form>
      </div>
    </div>
  )
}
export default CalenderScreen;