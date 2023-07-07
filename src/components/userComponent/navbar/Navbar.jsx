import React from "react";
import jwtDecode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getuserByEmail } from "../../../actions/users";
import { getPhotographerByEmail } from "../../../actions/photographers";

import "./navbar.css";

const Menu = () => (
  <>
    <p>
      <a href="/home">Home</a>
    </p>
    <p>
      <a href="/home#about">About</a>
    </p>
    <p>
      <a href="/profile">Profile</a>
    </p>
  </>
);

const Navbar = () => {
  const [profile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && !profile) {
      if (auth?.authorities[0] === "USER") {
        dispatch(getuserByEmail(auth.email, navigate));
      } else if (auth?.authorities[0] === "PHOTOGRAPHER") {
        dispatch(getPhotographerByEmail(auth.email, navigate));
      }
    }
  }, []);

  const signup = () => {
    navigate("/signup");
  };

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
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <div className="gpt3__navbar-links_container">
            <Menu />
          </div>
        </div>
        <div className="navbard-btn-contatiner">
          <div className="gpt3__navbar-sign">
            {!auth && <p onClick={(e) => navigate("/login")}>sign in</p>}
            {!auth && (
              <button type="button" onClick={signup}>
                sign up
              </button>
            )}
          </div>
          <div className="gpt3__navbar-dashbord-btn">
            <div className="gpt3__navbar-dashbord">
              {auth?.authorities[0] === "PHOTOGRAPHER" && (
                <button
                  type="button"
                  onClick={(e) => navigate("./photographer/profile")}
                >
                  Dashbord
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
      </div>
    </div>
  );
};

export default Navbar;
