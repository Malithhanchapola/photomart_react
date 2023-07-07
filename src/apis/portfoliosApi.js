import axio from 'axios';

const API = axio.create({baseURL:"http://52.69.244.112:8080/portfolio-service/api/v1/portfolios/"});


API.interceptors.request.use((req) => {
    if(localStorage.getItem('auth')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).jwt}`;
    }
    return req;
});



export const createPortfolio = (newPortfolio) =>  API.post('',newPortfolio);
export const getPortfolioByPhotId = (photId) =>  API.get(`?pId=${photId}`);
export const deletePortfolioById = (id,photId) =>  API.delete(`?id=${id}&pId=${photId}`);