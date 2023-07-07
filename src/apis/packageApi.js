import axio from 'axios';

const API = axio.create({baseURL:"http://52.69.244.112:8080/package-service/api/v1/packages/"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).jwt}`;
    }
    return req;
});


export const fetchPackageById = (id) =>  API.get(`?id=${id}`);
export const fetchPackageByPhotographerId = (photId) =>  API.get(`?pId=${photId}`);
export const createPackage = (newPackage) => API.post("",newPackage);
export const deletePackage = (id,pId) => API.delete(`?id=${id}&pId=${pId}`);