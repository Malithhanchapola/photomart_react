import React from 'react'
import './ContactsScreen.css'
import { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotographerById , updatePhotographerById} from '../../../actions/photographers'

export const ContactsScreen = () => {
  const {photographer} = useSelector((state)=>state.photographers);
  const [contactData, setContactData] = useState({photographerMobileNo:'', address:'', studioName:'', studioEmail:'', description:'', profilePicLink:'', whatsAppNumber:'', contactEmail:'', faceBookProfile:'' });
  const [profile,setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch();

  useEffect(()=>{
    if(photographer){
      setContactData(photographer)
    }
    else{
      dispatch(getPhotographerById(profile.photographerId));
    }
  },[]);

  const handelClick = async (e) => {
    e.preventDefault();
    // console.log(contactData);
    dispatch(updatePhotographerById(profile.photographerId,contactData))
  };

  return (
    <div>
        <form onSubmit={handelClick}>

          <div className="input-group">
            <label >Email</label>
            <input value={contactData?.contactEmail} onChange={(e)=> setContactData({...contactData, contactEmail:e.target.value})} type="email" id="email" />
          </div>

          <div className="input-group">
            <label >WhatsApp</label>
            <input value={contactData?.whatsAppNumber} onChange={(e)=> setContactData({...contactData, whatsAppNumber:e.target.value})} type="tel" id="mobile" />
          </div>

          <div className='input-group'>
            <label>Facebook Name</label>
            <input  value={contactData?.faceBookProfile} onChange={(e)=> setContactData({...contactData, faceBookProfile:e.target.value})} type="text" id="facebookName" />
          </div>

          <button type="submit" className="add-btn">
            {photographer?.contactEmail||photographer?.photographerMobileNo||photographer?.faceBookProfile ? 'UPDATE' : 'ADD'}
          </button>
          
        </form>
    </div>
  )
}

export default ContactsScreen;