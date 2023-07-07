import { FETCH_USER_BY_EMAIL } from "../constants/actionTyps";

const usersReducer =  ( state = {users:[]}, action) => {
    switch(action.type){
        case FETCH_USER_BY_EMAIL:
            localStorage.setItem('profile', JSON.stringify({...action?.payload.user}))
            return {...state, user: action.payload.user};
        default:
            return state;
    }

};

export default usersReducer;