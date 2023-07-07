import React, { useState} from "react";
import "./bookingCard.css";

import { useDispatch, useSelector } from "react-redux";
import { updateBookingStatus } from "../../../actions/booking";
import { useLocation } from "react-router-dom";

const moment = require("moment");

export const BookingCard = ({ aBooking }) => {
  const [bookingData, setBookingData] = useState(aBooking);
  const dispatch = useDispatch();
  const location = useLocation();

  const onConfirmedClick = (status) => {
    dispatch(updateBookingStatus(bookingData?.bookingId, status));
    window.location.reload(false);
  };

  return (
    <div className="booking-card-continer">
      <div className="row-continer-1">
        <div className="column-continer-1">
          <p>Booking Number : {bookingData?.bookingId}</p>
          <p>Customer Name : {bookingData?.customer.fullName}</p>
          <p>Customer Email : {bookingData?.customer.email}</p>
          <p>Mobile Number : {bookingData?.customer.phoneNo}</p>
          <p>Address : {bookingData?.customer.address}</p>
          <p>Message : {bookingData?.customer.message}</p>
        </div>
        <div className="column-continer-1">
          <p>Date : {moment(bookingData?.date).format("DD/MM/YYYY")}</p>
          <p>Location : {bookingData?.event.locating}</p>
          <p>Time : {bookingData?.event.time}</p>
          <p>Package Number : {bookingData?.apackage.packageId}</p>
          <p>package Tittle : {bookingData?.apackage.packageTittle}</p>
          <p>Price : {bookingData?.apackage.price}</p>
        </div>
        <div className="column-continer-1">
          <p>Booking Status : {bookingData?.status}</p>
          <p>Payment Status : {bookingData?.paymentStatus}</p>
        </div>

        {location.pathname.includes("photographer") && (
          <div className="column-continer-2">
            <button
              onClick={(e) => onConfirmedClick("confirmed")}
              disabled={
                bookingData?.paymentStatus == "confirmed" &&
                bookingData?.status == "pending"
                  ? false
                  : true
              }
              className="confirm-btn"
            >
              Confirm
            </button>
            <button
              onClick={(e) => onConfirmedClick("canceled")}
              disabled={bookingData?.status == "pending" ? false : true}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button disabled={true} className="remove-btn">
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
