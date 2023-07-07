import * as api from '../apis/calendarApi';

import { CREATE_CALENDAR, FETCH_CALENDAR_BY_ID, FETCH_CALENDAR_BY_PHTGPHR_ID } from '../constants/actionTyps';

export const createCalendarEvent = (newEvent) => async (dispatch) => {
    try{
        const {data} = await api.createCalendarEvent(newEvent);
        dispatch({type:CREATE_CALENDAR, payload:{calendars : data}});
    }catch(error){
        console.log(error);
    }
}

export const getCalendarEventByPhtoId = (pId) => async (dispatch) => {
    try{
        const {data} = await api.getCalendarEventByPhtoId(pId);
        dispatch({type:FETCH_CALENDAR_BY_PHTGPHR_ID, payload:{calendars : data}});
    }catch(error){
        console.log(error);
    }
}

export const getCalendarEventByid = (id) => async (dispatch) => {
    try{
        const {data} = await api.getCalendarEventByid(id);
        dispatch({type:FETCH_CALENDAR_BY_ID, payload:{calendar : data}});
    }catch(error){
        console.log(error);
    }
}