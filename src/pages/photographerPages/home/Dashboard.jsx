import React from 'react';

import {NavBar,Sidebar} from '../../../components/photographerComponent';
import { Outlet} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPhotographerById } from '../../../actions/photographers';


import './dashboard.css';

export default function Home(match) {
  const dispatch = useDispatch();

  let id = 1

  useEffect(()=>{
    dispatch(getPhotographerById(id));
  });

  return (

    <div>
      <NavBar/>
      <div className='dashboard'>
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  )
}
