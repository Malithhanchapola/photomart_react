import { Email } from '@mui/icons-material';
import axio from 'axios';

const API = axio.create({baseURL:"http://52.69.244.112:8080/photographer-service/api/v1/photographers/"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).jwt}`;
    }
    return req;
});



export const fetchPhotogrphers = () => API.get('');
export const fetchPhotogrphersLimited = (count) => API.get(`limit?count=${count}`);
export const fetchPhotographerById = (id) =>  API.get(`?pId=${id}`);
export const fetchPhotographerByEmail = (email) =>  API.get(`?pEmail=${email}`);
export const updatePhotographerById = (id,photographerDetails) =>  API.put(`?pId=${id}`,photographerDetails);