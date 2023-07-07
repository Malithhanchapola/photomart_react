import { CREATE_PORTFOLIO, DELETE_PORTFOLIO, FETCH_PORTFOLIO_BY_PHTGPHR_ID } from "../constants/actionTyps";

const portfoliosReducer =  ( state = {portfolios:[]}, action) => {
    switch(action.type){
        case FETCH_PORTFOLIO_BY_PHTGPHR_ID:
        case CREATE_PORTFOLIO:
            return {...state, portfolios: action.payload.portfolios};
        case DELETE_PORTFOLIO:
            return {...state , portfolios: state.portfolios.filter(portfolio => portfolio.id !== action.payload.id)}
        default:
            return state;
    }

};

export default portfoliosReducer;