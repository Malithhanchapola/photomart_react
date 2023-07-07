import * as api from '../apis/bookingApi';

import { CREATE_BOOKING, FETCH_BOOKING_BY_ID, FETCH_BOOKING_BY_PHTGPHR_ID, FETCH_BOOKING_BY_USER_ID } from '../constants/actionTyps';


export const createBooking = (newBooking, navigate) => async (dispatch) => {
    try{
        const {data} = await api.createBooking(newBooking);
        dispatch({type:CREATE_BOOKING, payload:{bookings: data}});
        window.location.replace(`/booking/${newBooking.photographerId}`);
    }catch(error){
        console.log(error);
    }
};

export const getBookingsByPid = (photId) => async (dispatch) => {
    try{
        const {data} = await api.getBookingsByPid(photId);
        dispatch({type:FETCH_BOOKING_BY_PHTGPHR_ID, payload:{bookings: data}});
    }catch(error){
        console.log(error);
    }
};

export const getBookingsByUid = (uId) => async (dispatch) => {
    try{
        const {data} = await api.getBookingsByUid(uId);
        dispatch({type:FETCH_BOOKING_BY_USER_ID, payload:{bookings: data}});
    }catch(error){
        console.log(error);
    }
};

export const updateBookingStatus = (id,status) => async (dispatch) => {
    try{
        const {data} = await api.updateBookingStatus(id,status);
        dispatch({type:FETCH_BOOKING_BY_ID, payload:{booking:data}});
    }catch(error){
        console.log(error);
    }
};