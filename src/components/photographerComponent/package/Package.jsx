import './package.css'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { deletePackage } from '../../../actions/packages';

export default function Package({aPackage}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const handelDelete = ()=>{
    dispatch(deletePackage(aPackage.packageId,aPackage.photographerId));    
  }

  return (
    <div className='package'>
        <div className="packageContainer">
          <div className="packageInfo">
          <div className="packageNames">
            <span className="packageName">{aPackage.packageTittle}</span>
          </div>
          <span className="packageLocation">
            {aPackage.packageTittle}
          </span>
          <p className="packageDec">
            {aPackage.packageDescription}
          </p>


          </div>
      </div>

      <div className="packageDel">
        {location.pathname.includes('package') && <button type="submit" onClick={handelDelete} className="packageDelBtn">Delete</button>}
      </div>
    </div>
  )
}
