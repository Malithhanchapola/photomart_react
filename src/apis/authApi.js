import axio from 'axios';

const API = axio.create({baseURL:"http://52.69.244.112:8080/authentication-service"});


export const authenticatUser = (userDet) => API.post('/login',userDet);
export const createNewUser = (newUser) =>  API.post('/api/v1/auth/users',newUser);