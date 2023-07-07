import AddButton from '../addbutton/AddButton'
import Portfolio from '../portfolio/Portfolio'
import './portfolios.css'

import  {Grid} from "@mui/material";

import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { getPortfoliosByPhotId } from '../../../actions/portfolios';

export default function Portfolios({photId}) {

  const [profile,setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
  const {portfolios} = useSelector((state)=>state.portfolios);
  const dispatch = useDispatch();
  const location  = useLocation();

  useEffect(()=>{
    if(location.pathname.includes('portfolio')){
      dispatch(getPortfoliosByPhotId(profile.photographerId));
    }
    else{
      dispatch(getPortfoliosByPhotId(photId));
    }
  },[dispatch]);

  return (
    <div className='portfolios'>
        <Grid container direction="row" justifyContent="center">
            {portfolios?.length<3 && location.pathname.includes('portfolio') && <Grid item xs={4}><AddButton buttonType={"addPortfolio"}/></Grid>}
            {portfolios?.map((portfolio)=> <Grid key={portfolio.id} item xs={4}><Portfolio portfolio={portfolio}/></Grid>)}
        </Grid>

    </div>
  )
}
