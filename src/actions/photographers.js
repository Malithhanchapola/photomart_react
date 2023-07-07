import * as api from '../apis/photographersApi';

import { FETCH_ALL_PHOTOGRAPHER, FETCH_PHOTOGRAPHER_BY_EMAIL, FETCH_PHOTOGRAPHER_BY_ID, UPDATE_PHOTOGRAPHER } from '../constants/actionTyps';


export const getPhotographers = () => async (dispatch) => {
    try{
       const {data} = await api.fetchPhotogrphers();
       dispatch({type:FETCH_ALL_PHOTOGRAPHER, payload:{photographers:data}});
    }catch(error){
        console.log(error);
    }
}

export const getPhotographersLimited = (count) => async (dispatch) => {
    try{
       const {data} = await api.fetchPhotogrphersLimited(count);
       dispatch({type:FETCH_ALL_PHOTOGRAPHER, payload:{photographers:data}});
    }catch(error){
        console.log(error);
    }
}

export const getPhotographerById = (photId) => async (dispatch) => {
    try{
       const {data} = await api.fetchPhotographerById(photId);
       dispatch({type:FETCH_PHOTOGRAPHER_BY_ID, payload:{photographer:data}});
    }catch(error){
        console.log(error);
    }
}

export const getPhotographerByEmail = (email,navigate) => async (dispatch) => {
    try{
       const {data} = await api.fetchPhotographerByEmail(email);
       dispatch({type:FETCH_PHOTOGRAPHER_BY_EMAIL, payload:{photographer:data}});
       navigate('/home')
    }catch(error){
        console.log(error);
    }
}

export const updatePhotographerById = (photId,photographerDetails) => async (dispatch) => {
    try{
        
        const {data} = await api.updatePhotographerById(photId,photographerDetails);
        dispatch({type:UPDATE_PHOTOGRAPHER, payload:{photographer:data}});
    }catch(error){
        console.log(error);
    }
}