import React from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPackagesByPhotId } from '../../../actions/packages';

import './packageCard.css';

const PackageCard = ({id,handelPackageData}) => {
    const dispatch = useDispatch();

    const {packages} = useSelector((state)=>state.packages);

    useEffect(()=>{
        dispatch(getPackagesByPhotId(id));
    },[dispatch]);

    const handelChange = (pack)=>{
        handelPackageData(pack)
        // setPackageData(pack)
    }

  return (    
    <div > 
        <div className="packages_card_container">
          <Grid container  justifyContent={'space-evenly'}>
            {packages?.map(pack=> 
              <Grid key={pack.id} item xs={12} sm={4} >
                <div className="package_card">
                    <p>{pack.packageTittle}</p>
                  <input type="radio" onChange={handelChange(pack)} value={pack.packageId} name="type" className="package_radio" />
                </div>
              </Grid>
            )}
          </Grid>
        </div>
    </div>
  )
}

export default PackageCard;
