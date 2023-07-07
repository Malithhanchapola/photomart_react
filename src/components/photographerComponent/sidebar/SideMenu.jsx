import React from 'react'
import './SideMenu.css'
import { useNavigate , useLocation} from "react-router-dom";

const SideMenu = () => {
    const navigate = useNavigate();

    const location = useLocation()

    return (
        <div className='sideMenuItemContainer'>
            <div className= {location.pathname.includes("profile")? 'sideMenu sideMenuClick': 'sideMenu'}>
                <a onClick={()=>navigate("profile")}>Profile</a>
            </div>

            <div className= {location.pathname.includes("booking")? 'sideMenu sideMenuClick': 'sideMenu'}>
                <a onClick={()=>navigate("bookings")}>Bookings</a>
            </div>

            <div className= {location.pathname.includes("package")? 'sideMenu sideMenuClick': 'sideMenu'}>
                <a onClick={()=>navigate("package")}>Package</a>
            </div>

            <div className= {location.pathname.includes("portfolio")? 'sideMenu sideMenuClick': 'sideMenu'}>
                <a onClick={()=> navigate("portfolio" )}>Portfolio</a>
            </div>

            <div className= {location.pathname.includes("calendar")? 'sideMenu sideMenuClick': 'sideMenu'}>
                <a onClick={()=>navigate("calendar")}>Calender</a>
            </div>

            <div className= {location.pathname.includes("contacts")? 'sideMenu sideMenuClick': 'sideMenu'}>
                <a onClick={()=>navigate("contacts")}>Contacts</a>
            </div>
        </div>
    )
}

export default SideMenu;