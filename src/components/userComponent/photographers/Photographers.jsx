import React from 'react';

import Card from '../card/Card';
import Search from '../search/Search';
import './photographers.css';


const Photographers = () => {
  return (    
    <div className='photographers-page'> 
        <Search/>              
        <Card/>
    </div>
  )
}

export default Photographers;
