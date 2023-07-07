import React from "react";

import Calendar from "../calendar/Calendar";
import Packages from "../../photographerComponent/packages/Packages";
import Portfolios from "../../photographerComponent/portfolios/Portfolios";
import { EmailSharp, Facebook, WhatsApp } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPhotographerById } from "../../../actions/photographers";

import "./booking.css";

const Booking = () => {
  const { photographer } = useSelector((state) => state.photographers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPhotographerById(id.id));
  }, [id.id]);

  const handelClick = () => {
    navigate(`form`);
  };

  const handelCalendarData = (data) => {};

  return (
    <div className="booking_container">
      <div className="photograper-studio_title_container">
        <h2>Welcome to {photographer?.studioName} Studio</h2>
      </div>
      <div className="calender">
        <div className="calender_container">
          <Calendar id={id.id} handelCalendarData={handelCalendarData} />
        </div>
      </div>
      <div className="booking_package_container">
        <h2>Packages</h2>
        <div className="booking_package">
          <Packages photId={id.id} />
        </div>
      </div>

      <div className="booking_portfolios_container">
        <h2>Portfolios</h2>
        <div className="booking_portfolios">
          <Portfolios photId={id.id} />
        </div>
      </div>

      <div className="booking_contacts_container">
        <div className="booking_contacts">
          <EmailSharp />
          <h3>{photographer?.contactEmail}</h3>
        </div>
        <div className="booking_contacts">
          <WhatsApp />
          <h3>{photographer?.whatsAppNumber}</h3>
        </div>
        <div className="booking_contacts">
          <Facebook />
          <h3>{photographer?.faceBookProfile}</h3>
        </div>
      </div>
      <div className="booking_button_container">
        <button onClick={handelClick}>Book Now</button>
      </div>
    </div>
  );
};

export default Booking;
