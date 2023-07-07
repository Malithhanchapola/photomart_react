import axio from 'axios';

const API = axio.create({baseURL:"http://52.69.244.112:8080/user-service/api/v1/users/"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).jwt}`;
    }
    return req;
});




export const getUserbyId = (id) =>  API.get(`?uId=${id}`);
export const getUserbyEmail = (email) =>  API.get(`?uEmail=${email}`);
