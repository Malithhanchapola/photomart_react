import React from 'react';
import { Navbar,Footer} from '../../components/userComponent';
import { Outlet , useLocation} from 'react-router-dom';
import { useEffect } from 'react';

import './mainpage.css';

const MainPage = () => {
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname === "/"){
        window.location.replace("/home")
    }
  })


  return (
    <div className='mainpage_container'>  
        {location.pathname !== "/" && <Navbar/>}
        <Outlet/>
        {location.pathname !== "/" && <Footer/>}
    </div> 
  )
};

export default MainPage;