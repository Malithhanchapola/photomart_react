import React from 'react';
import PhotoCard from "./photoCard/PhotoCard";
import './card.css';
import  {Grid} from "@mui/material";
import { useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import { getPhotographersLimited , getPhotographers } from '../../../actions/photographers';


const Card = ({count}) => {

  const {photographers} = useSelector((state)=> state.photographers);
  const [auth,setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handelFindmore = () => {
    if(auth){
      navigate("/findmore");
    }
    else{
      navigate('/login')
    }
  };

  useEffect(()=>{
    if(location.pathname.includes('home')){
      dispatch(getPhotographersLimited(3));
    }
    else{
      dispatch(getPhotographers());
    }
  },[dispatch]);

  return(
    <div className="now_showing-container">
        <div className="now_showing-container_header">
        </div>
        <Grid container direction="row" justifyContent='center'>
            
            {photographers?.map(photographer => <Grid key={photographer.photographerId} item xs={4}><PhotoCard photographer={photographer}/></Grid>)}

        </Grid> 

        {!location.pathname.includes('findmore') &&
          <div className='btn_findMore'>
            <button type="button" onClick={handelFindmore} >Find More</button>
          </div> 
        }
    </div>
    


    )
}

export default Card