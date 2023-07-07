import React from 'react';
import {Card,About} from './../../../../components/userComponent';
import './home.css';

const Home = () => {
  // const [auth,setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   if(auth ){
  //     if(auth?.authorities[0] === 'USER'){
  //         dispatch(getuserByEmail(auth.email,navigate))
  //     }
  //     else if(auth?.authorities[0] === 'PHOTOGRAPHER'){
  //         console.log('PHOTOGRAPHER');
  //     }
  //   }
  // });

  return (
    <div>
        <div className='home'>
            <div className="homepage_text">
                <p className="homepage_text-large_text">PhotoMart</p>
                <p className="homepage_text-small_text">Find and book professional photographers around the world</p>
            </div> 
        </div>
        <Card/>
        <About/>
    </div> 
  )
}

export default Home;