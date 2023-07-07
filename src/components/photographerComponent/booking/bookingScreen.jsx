import React from "react";

import { Grid } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBookingsByPid, getBookingsByUid } from "../../../actions/booking";
import BookingCard from "../bookingCard/BookingCard";
import './booking.css'

const moment = require("moment");

const BookingScreen = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const { bookings } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes("profile") &&
      auth?.authorities[0] === "USER"
    ) {
      dispatch(getBookingsByUid(profile?.userId));
    } else {
      dispatch(getBookingsByPid(profile?.photographerId));
    }
  }, [dispatch]);

  return (
    <div className="booking-cards-container">
      {bookings.length === 0 ? (
        <h3>No booking records</h3>
      ) : (
        <Grid container direction="column" justifyContent="space-evenly">
          {bookings?.map((aBooking) => (
            <Grid key={aBooking.bookingId} item xs={4}>
              <BookingCard aBooking={aBooking} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default BookingScreen;
