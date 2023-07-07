import { FETCH_ALL_PHOTOGRAPHER, FETCH_PHOTOGRAPHER_BY_EMAIL, FETCH_PHOTOGRAPHER_BY_ID, UPDATE_PHOTOGRAPHER } from "../constants/actionTyps";

const photographersReducer =  ( state={photographers:[]}, action) => {
    switch(action.type){
        case FETCH_ALL_PHOTOGRAPHER:
            return {...state , photographers:action.payload.photographers};;
        case UPDATE_PHOTOGRAPHER :
        case FETCH_PHOTOGRAPHER_BY_ID:
            return {...state , photographer:action.payload.photographer};
        case FETCH_PHOTOGRAPHER_BY_EMAIL:
            localStorage.setItem('profile', JSON.stringify({...action?.payload.photographer}))
            return {...state , photographer:action.payload.photographer};
        default:
            return state;
    }

};

export default photographersReducer;