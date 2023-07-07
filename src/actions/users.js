import * as api from '../apis/usersApi';

import { FETCH_USER_BY_EMAIL } from '../constants/actionTyps';


export const getuserByEmail = (email,navigate) => async (dispatch) => {
    try{
        const {data} = await api.getUserbyEmail(email);
        dispatch({type:FETCH_USER_BY_EMAIL, payload:{user:data}});
        navigate(`/home`);
    }catch(error){
        console.log(error);
    }
};