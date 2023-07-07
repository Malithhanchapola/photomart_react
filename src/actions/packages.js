import * as api from '../apis/packageApi';

import {CREATE_PACKAGE, DELETE_PACKAGE, FETCH_ALL_PACKAGE, FETCH_PACKAGE_BY_PHTGPHR_ID } from '../constants/actionTyps';

export const getPackagesByPhotId = (photId) => async (dispatch) => {
    try{
        const {data} = await api.fetchPackageByPhotographerId(photId);
        dispatch({type:FETCH_PACKAGE_BY_PHTGPHR_ID, payload:{packages : data}});
    }catch(error){
        dispatch({type:FETCH_PACKAGE_BY_PHTGPHR_ID, payload:{packages : []}});
        console.log(error);
    }
}

export const getPackageById = (id) => async (dispatch) => {
    try{
        const {data} = await api.fetchPackageById(id);
        dispatch({type:FETCH_ALL_PACKAGE, payload:{packages : data}});
    }catch(error){
        console.log(error);
    }
}

export const createPackage = (newPackage, navigate) => async (dispatch) => {
    try{
        const {data} = await api.createPackage(newPackage);
        dispatch({type:CREATE_PACKAGE, payload:{packages : data}});
        navigate(`/photographer/package`);
    }catch(error){
        console.log(error);
    }
}

export const deletePackage = (id,pId) => async (dispatch) => {
    try{
        await api.deletePackage(id,pId);
        dispatch({type: DELETE_PACKAGE, payload:{id : id}});
    }catch(error){
        console.log(error);
    }
}