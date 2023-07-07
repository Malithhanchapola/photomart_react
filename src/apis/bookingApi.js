import axio from 'axios';

const API = axio.create({baseURL:"http://52.69.244.112:8080/booking-service/api/v1/bookings/"});


API.interceptors.request.use((req) => {
    if(localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).jwt}`;
    }
    return req;
});


export const createBooking = (newBooking) => API.post('',newBooking);
export const getBookingsByPid = (photId) => API.get(`?pId=${photId}`);
export const getBookingsByUid = (uId) => API.get(`?uId=${uId}`);
export const updateBookingStatus = (id,status) => API.put(`?id=${id}&bStatus=${status}`)

