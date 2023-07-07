import { CREATE_PACKAGE, DELETE_PACKAGE, FETCH_PACKAGE_BY_PHTGPHR_ID } from "../constants/actionTyps";

const packagesReducer =  ( state = {packages:[]}, action) => {
    switch(action.type){
        case FETCH_PACKAGE_BY_PHTGPHR_ID:
        case CREATE_PACKAGE:
            return {...state, packages: action.payload.packages};
        case DELETE_PACKAGE:
            return {...state, packages: state.packages.filter((apackage)=> apackage.packageId !== action.payload.id)};
        default:
            return state;
    }

};

export default packagesReducer;