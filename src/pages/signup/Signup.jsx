import React from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { createNewUser } from "../../actions/auth";

const Signup = () => {
  const { error } = useSelector((state) => state.auth);
  const [isPhotographer, setIsPhotographer] = useState(false);
  const [errorMsg, setErroMsg] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [newUserData, setNewUserData] = useState({
    userEmail: "",
    userName: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    studioName: "",
    address: "",
    authorities: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelClick = (status) => {
    setIsPhotographer(status);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    validate();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(errorMsg).length === 0 && isSubmit) {
      if (isPhotographer) {
        dispatch(
          createNewUser(
            { ...newUserData, authorities: ["PHOTOGRAPHER"] },
            navigate
          )
        );
      } else {
        dispatch(
          createNewUser({ ...newUserData, authorities: ["USER"] }, navigate)
        );
      }
    }
    console.log(error);
  }, [errorMsg]);

  const validate = () => {
    const errors = {};
    if (!newUserData.userName) {
      errors.userName = "Name is required!";
    }
    if (!newUserData.userEmail) {
      errors.userEmail = "Email is required!";
    }
    if (!newUserData.mobileNumber) {
      errors.mobileNumber = "Mobile Number is required!";
    }
    if (!newUserData.address) {
      errors.address = "Address is required!";
    }
    if (!newUserData.studioName) {
      errors.studioName = "Studio name is required!";
    }
    if (!newUserData.password) {
      errors.password = "Password is required!";
    }
    if (!newUserData.confirmPassword) {
      errors.confirmPassword = "confirm password is required!";
    }
    if (newUserData.confirmPassword !== newUserData.password) {
      errors.password = "Passwords did not match!";
      errors.confirmPassword = "Passwords did not match!";
    }
    setErroMsg(errors);
  };

  return (
    <div>
      <div className="signup-container">
        <div className="cancelBtn">
          <button onClick={() => navigate("/home")}>x</button>
        </div>
        <div className="signup-form-container">
          <div className="signup-form-1">
            <div className="signup-form-titel">
              <span
                onClick={(e) => handelClick(false)}
                className={isPhotographer ? "titel-1" : "titel-1 titel-onClick"}
              >
                <h3>User</h3>
              </span>
              <span
                onClick={(e) => handelClick(true)}
                className={isPhotographer ? "titel-2 titel-onClick" : "titel-2"}
              >
                <h3>Photographer</h3>
              </span>
            </div>
            <form onSubmit={handelSubmit}>
              <div className="signup-row">
                <div className="signup-column-1">
                  <div className="input-container">
                    <input
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          userName: e.target.value,
                        })
                      }
                      value={newUserData.userName}
                      type="text"
                      className="form-control"
                      placeholder="Full Name *"
                    />
                    <p>{errorMsg?.userName}</p>
                  </div>
                  <div className="input-container">
                    <input
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          userEmail: e.target.value,
                        })
                      }
                      value={newUserData.userEmail}
                      type="email"
                      className="form-control"
                      placeholder="Email *"
                    />
                    <p>{errorMsg?.userEmail}</p>
                  </div>
                  <div className="input-container">
                    <input
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          password: e.target.value,
                        })
                      }
                      value={newUserData.password}
                      type="password"
                      className="form-control"
                      placeholder="Password *"
                    />
                    <p>{errorMsg?.password}</p>
                  </div>
                  <div className="input-container">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Your Password *"
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          confirmPassword: e.target.value,
                        })
                      }
                      value={newUserData.confirmPassword}
                    />
                    <p>{errorMsg?.confirmPassword}</p>
                  </div>
                </div>

                <div className="signup-column-2">
                  <div className="input-container">
                    <input
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          mobileNumber: e.target.value,
                        })
                      }
                      value={newUserData.mobileNumber}
                      type="number"
                      className="form-control"
                      placeholder="Mobile  *"
                    />
                    <p>{errorMsg?.mobileNumber}</p>
                  </div>

                  <div className="input-container">
                    <input
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          address: e.target.value,
                        })
                      }
                      value={newUserData.address}
                      type="text"
                      className="form-control"
                      placeholder="Address *"
                    />
                    <p>{errorMsg?.address}</p>
                  </div>

                  <div className="input-container">
                    {isPhotographer && (
                      <>
                      <input
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            studioName: e.target.value,
                          })
                        }
                        value={newUserData.studioName}
                        type="text"
                        className="form-control"
                        placeholder="Studio Name *"
                      />
                      <p>{errorMsg?.studioName}</p>
                      </>
                    )}
                  </div>

                  <div className="signup-error">
                    <p>
                      {error?.response.status === 403 && "Registretion failed"}
                    </p>
                  </div>

                  <div className="input-container-btn">
                    <button type="submit" className="btnSubmit">
                      Submit
                    </button>
                  </div>
                  <div className="input-container">
                    <a href="/login" className="ForgetPwd">
                      Already have an account
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
