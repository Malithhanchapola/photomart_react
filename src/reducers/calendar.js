import { CREATE_CALENDAR, FETCH_CALENDAR_BY_ID, FETCH_CALENDAR_BY_PHTGPHR_ID} from "../constants/actionTyps";

const calendarReducer =  ( state = {calendars:[]}, action) => {
    switch(action.type){
        case FETCH_CALENDAR_BY_PHTGPHR_ID:
            return {...state, calendars:action.payload.calendars};
        case FETCH_CALENDAR_BY_ID:
            return {...state, calendar:action.payload.calendar};
        case CREATE_CALENDAR:
            return {...state, aCalendar:action.payload.calendars, calendars:[...state.calendars, action.payload.calendars]};
        default:
            return state;
    }

};

export default calendarReducer;