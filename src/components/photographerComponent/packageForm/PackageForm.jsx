import './packageForm.css'
import { useNavigate} from "react-router-dom";
import { useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { createPackage } from '../../../actions/packages';


export default function PackageForm() {
    const [packageData , setPackageData] = useState({photographerId:'',packageTittle:'',packageDescription:'',price:'',packageStatus:''});
    const [profile,setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const {packages} = useSelector((state)=> state.packages);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handelSubmit = async (e) =>{
        e.preventDefault();
        if(packages.length < 3){
            dispatch(createPackage({...packageData, photographerId: profile.photographerId},navigate));
        }
        else{
            navigate('/photographer/package');
        }
    };

    return (
        <div className='packageForm'>
            <form className="packForm" onSubmit={handelSubmit}>

                <div className="packFormBox">
                    <div className="row50">
                        <div className="inputBox">
                            <span>Package Name</span>
                            <input type="text" value={packageData.packageTittle} onChange={(e)=> setPackageData({...packageData, packageTittle: e.target.value})} placeholder='Enter package name .......' className='inputField' autoFocus='yes' />
                        </div>

                        <div className="inputBox">
                            <span>Wedding Status</span>
                            <input type="text" value={packageData.packageStatus} onChange={(e)=> setPackageData({...packageData, packageStatus: e.target.value})} placeholder='Enter wedding status .......' className='inputField' />
                        </div>

                        
                    </div>

                    <div className="inputBox">
                            <span>Price</span>
                            <input type="text" value={packageData.price} onChange={(e)=> setPackageData({...packageData, price: e.target.value})} placeholder='Enter price .......' className='inputField' />
                        </div>

                    <div className="row100">
                        <div className="inputBox">
                            <span>Description</span>
                            <textarea name=""  id="textArea" value={packageData.packageDescription} onChange={(e)=> setPackageData({...packageData, packageDescription: e.target.value})} placeholder='Enter description ...' cols="30" rows="10"></textarea>
                            
                        </div>
                    </div>
                </div>

                <div className="row100">
                        <div className="inputBox">
                            <input type="submit" value="Add" />
                        </div>
                    
                </div>
            </form>
        </div>
    )
}
