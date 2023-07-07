import { CREATE_BOOKING, FETCH_BOOKING_BY_ID, FETCH_BOOKING_BY_PHTGPHR_ID, FETCH_BOOKING_BY_USER_ID } from "../constants/actionTyps";

const bookingsReducer =  ( state = {bookings:[]}, action) => {
    switch(action.type){
        case CREATE_BOOKING:
            return {...state, booking: action.payload.bookings};
        case FETCH_BOOKING_BY_PHTGPHR_ID:
            return {...state, bookings: action.payload.bookings};
        case FETCH_BOOKING_BY_USER_ID:
            return {...state, bookings: action.payload.bookings};
        case FETCH_BOOKING_BY_ID:
            return {...state , booking: action.payload.booking}
            // return {...state, bookings:state.bookings.map((aBooking)=> aBooking.bookingId === action.payload.booking.bookingId && action.payload.booking)};
        default:
            return state;
    }
};

export default bookingsReducer;