import './profile.css'


import { storage } from '../../../Firebase/firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { AddAPhoto } from '@mui/icons-material';
import { getPhotographerById, updatePhotographerById } from '../../../actions/photographers';


export default function ProfileScreen() {
    const [images, setImages] = useState('');
    const [ photographerData, setPhotographerData] = useState({photographerMobileNo:'', address:'', studioName:'', studioEmail:'', description:'', profilePicLink:'',whatsAppNumber:'',contactEmail:'',faceBookProfile:''});
    const [profile,setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const {photographer} = useSelector((state)=> state.photographers);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(profile){
            dispatch(getPhotographerById(profile.photographerId));
            // setPhotographerData(photographer)
        }
    },[])


    useEffect(()=>{
        if(profile){
            setPhotographerData(photographer)
        }
    },[photographer])

    const handleImageChange = (index) => (event) => {
        const newImages = [...images];
        newImages[index] = event.target.files[0];
        setImages(newImages);
    };

    const handleRemoveImage = (index) => () => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
    }

    const handelSubmit=(e)=>{
        e.preventDefault()
        if(images){
            const storageRef = ref(storage, `/images/profile/${profile.photographerId}/${images[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, images[0]);
            uploadTask.on('state_changed', 
                (snapShot) => {
                    console.log(snapShot)
                }, (err) => {
                    console.log(err)
                }, () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then(fireBaseUrl => {
                    dispatch(updatePhotographerById(profile.photographerId,{...photographerData,profilePicLink:fireBaseUrl}))
                })
            })
        }
        else{
            dispatch(updatePhotographerById(profile.photographerId,photographerData));
        }
    
    }

    return (
        
        <div className='profileForm'>
            <div className='profile-container'>
                <div className="profile-img-container" >
                    {!images[0]? (
                        <>
                        <AddAPhoto/>
                            
                        <label htmlFor={`file-input`}>
                            {`Choose a file`}
                            <input
                            id={`file-input`}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange(0)}
                            style={{ display: "none" }}
                            />
                        </label>
                        </>
                    ) : (
                        <>
                        <img
                            src={URL.createObjectURL(images[0])}
                            alt="Selected Image"
                            className="image"
                            onClick={handleRemoveImage(0)}
                        />
                        {/* <button onClick={handleRemoveImage(index)}>Remove</button> */}
                        </>
                    )}
                </div>
            </div>
            <form onSubmit={handelSubmit}>
                <div className='form-row'>
                    <div className='form-column-1'>
                    <div className="input-container">
                        <input value={photographerData?.studioName} onChange={(e)=>setPhotographerData({...photographerData, studioName:e.target.value})} type="text" className="form-control" placeholder="Studio Name *" />
                    </div>
                    <div className="input-container">
                        <input value={photographerData?.studioEmail} onChange={(e)=>setPhotographerData({...photographerData, studioEmail:e.target.value})} type="email" className="form-control" placeholder="Studio Email *" />
                    </div>
                    <div className="input-container">
                        <input value={photographerData?.address} onChange={(e)=>setPhotographerData({...photographerData, address:e.target.value})} type="text" className="form-control" placeholder="Address *" />
                    </div>
                    <div className="input-container">
                        <input value={photographerData?.photographerMobileNo} onChange={(e)=>setPhotographerData({...photographerData, photographerMobileNo:e.target.value})} type="text" className="form-control" placeholder="Mobile *" />
                    </div>
                    </div>

                    <div className='form-column-2'>
                    <div className="input-container">
                        {/* <input  type="text" className="form-control" placeholder="Description *" /> */}
                        <textarea value={photographerData?.description} onChange={(e)=>setPhotographerData({...photographerData, description:e.target.value})} placeholder='Description *' cols="30" rows="10"></textarea>
                    </div>
                    <div className="input-container-btn">
                        <button type="submit" className="btnSubmit">Submit</button>
                    </div>
                    </div>
                </div>
        
            </form>
        </div>
    )
}
