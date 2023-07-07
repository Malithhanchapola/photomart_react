import * as api from '../apis/portfoliosApi';

import { CREATE_PORTFOLIO, DELETE_PORTFOLIO ,FETCH_PORTFOLIO_BY_PHTGPHR_ID} from '../constants/actionTyps';

export const createPortfolio = (newPortfolio, navigate) => async (dispatch) => {
    try{
        const {data} = await api.createPortfolio(newPortfolio);
        dispatch({type:CREATE_PORTFOLIO, payload:{portfolios: data}});
        navigate(`/photographer/portfolio`);
    }catch(error){
        console.log(error);
    }
};

export const getPortfoliosByPhotId = (photId) => async (dispatch) => {
    try{
        const {data} = await api.getPortfolioByPhotId(photId);
        dispatch({type:FETCH_PORTFOLIO_BY_PHTGPHR_ID, payload:{portfolios: data}});
    }catch(error){
        dispatch({type:FETCH_PORTFOLIO_BY_PHTGPHR_ID, payload:{portfolios: []}});
        console.log(error);
    }
};

export const deletePortfoliosById = (id,photId) => async (dispatch) => {
    try{
        const {data} = await api.deletePortfolioById(id,photId);
        dispatch({type:DELETE_PORTFOLIO, payload:{id: id}});
    }catch(error){
        console.log(error);
    }
};