import React from "react";
import { useDispatch , useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticatUser } from "../../actions/auth";

import "./login.css";

export default function Login() {
  const {error}  = useSelector((state)=> state.auth);
  const [isPhotographer, setIsPhotographer] = useState(false);
  const [loginData, setLoginData] = useState({ userEmail: "", password: "" });
  const [errorMsg, setErroMsg] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelOnClick = () => {
    setIsPhotographer(!isPhotographer);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validate()
    setIsSubmit(true)
  };

  useEffect(()=>{
    if(Object.keys(errorMsg).length === 0 && isSubmit){
      dispatch(authenticatUser(loginData, navigate));
    }
    console.log(error)
  },[errorMsg])

  const validate = () => {
    const errors = {}
    if(!loginData.userEmail){
      errors.userEmail= "Email is required!";
    }
    if(!loginData.password){
      errors.password = "Password is required!";
    }
    setErroMsg(errors);
  }

  return (
    <div className="login-container">
      <div className="cancelBtn">
        <button onClick={() => navigate("/home")}>x</button>
      </div>
      <div className="login-form-container">
        <div className="login-form-1">
          <div className="login-form-titel">
            <div
              onClick={handelOnClick}
              className={isPhotographer ? "titel-1" : "titel-1 titel-onClick"}
            >
              <h3>User</h3>
            </div>
            <div
              onClick={handelOnClick}
              className={isPhotographer ? "titel-2 titel-onClick" : "titel-2"}
            >
              <h3>Photographer</h3>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="input-container">
              <input
                onChange={(e) =>
                  setLoginData({ ...loginData, userEmail: e.target.value })
                }
                type="email"
                className="form-control"
                placeholder="Your Email *"
                value={loginData.userEmail}
              />
              <p>{errorMsg?.userEmail}</p>
            </div>
            <div className="input-container">
              <input
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                type="password"
                className="form-control"
                placeholder="Your Password *"
                value={loginData.password}
              />
              <p>{errorMsg?.password}</p>
            </div>

            <p>{error?.response.status === 401 && "Bad credentials"}</p>
            
            <div className="input-container-btn">
              <button type="submit" className="btnSubmit">
                Login
              </button>
            </div>
            <div className="input-container">
              <a href="/signup" className="ForgetPwd">
                Create new account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
