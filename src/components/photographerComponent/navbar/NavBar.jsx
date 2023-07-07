import React from "react";
import "./NavBar.css";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { getPhotographerById } from "../../../actions/photographers";

export const NavBar = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const { photographer } = useSelector((state) => state.photographers);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getPhotographerById(profile?.photographerId));
  }, [dispatch]);

  const logout = () => {
    setAuth("");
    localStorage.removeItem("auth");
    localStorage.removeItem("profile");
    window.location.replace("/home");
  };

  const handelLogOut = (e) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    const token = auth?.jwt;
    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        // console.log("#")
        logout();
      }
    }
  }, [location]);



  return (
    <div className="navbar-container">
      <div className="navbar">
        <img
          src={photographer?.profilePicLink}
          alt="user profile"
          width="70px"
          hight="70px"
        />

        <div className="navbarlist">
          <p>{photographer?.photographerName}</p>
          <p>|</p>
          <p>{photographer?.contactEmail}</p>
          <p>|</p>
          <p>{photographer?.address}</p>
          <p>|</p>
          <p>{photographer?.photographerMobileNo}</p>
        </div>
      </div>

      <div className="navbar-dashbord-btn">
        <div className="navbar-dashbord">
          {auth?.authorities[0] === "PHOTOGRAPHER" && (
            <button type="button" onClick={(e) => navigate("/home")}>
              Home
            </button>
          )}
        </div>
        <div className="gpt3__navbar-singOut">
          {auth && (
            <button type="button" onClick={handelLogOut}>
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
