import React from 'react';
import './search.css';
// import cover from '../../assest/cover.jpg';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({placeholder,data}) => {
  return (
    <div className='search'>
        <div className='searchInputs'>
            <input type= "text" placeholder={placeholder} />
            <div className='searchIcon'>
              <SearchIcon/>
            </div>
        </div>

    </div>
    
    
  )
}

export default Search