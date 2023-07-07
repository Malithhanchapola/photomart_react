import * as api from '../apis/authApi';

import { CREATE , ERROR} from '../constants/actionTyps';


export const authenticatUser = (userDet,navigate) => async (dispatch) => {
    try{
        const {data} = await api.authenticatUser(userDet);
        dispatch({type:CREATE, payload:{data:userDet.userEmail ,token: data}});
        navigate(`/home`);
    }catch(error){
        dispatch({type:ERROR, payload:{data:error}});
        console.log(error);
    }
};

export const createNewUser = (newUser,navigate) => async (dispatch) => {
    try{
        const {data} = await api.createNewUser(newUser);
        dispatch({type:CREATE, payload:{data:newUser.userEmail,token: data}});
        navigate(`/home`);
    }catch(error){
        dispatch({type:ERROR, payload:{data:error}});
        console.log(error);
    }
};