import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import Calendar from "../calendar/Calendar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPackagesByPhotId } from "../../../actions/packages";
import { createCalendarEvent } from "../../../actions/calendar";
import { createBooking } from "../../../actions/booking";

import "./form.css";
const Form = () => {
  const [bookingData, setBookingData] = useState({
    userId: "",
    photographerId: "",
    calendarId: "",
    customerRequestDto: "",
    eventRequestDto: "",
    packageRequestDto: "",
  });
  const [calendarData, setCalendarData] = useState({
    photographerId: "",
    userId: "",
    dateTime: "",
    status: "",
  });
  const [packageData, setPackageData] = useState({
    packageTittle: "",
    packageDescription: "",
    price: "",
    packageStatus: "",
  });
  const [eventData, setEventData] = useState({ locating: "", time: "" });
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    message: "",
  });
  const { packages } = useSelector((state) => state.packages);
  const { aCalendar } = useSelector((state) => state.calendars);
  const [ isLoding, setIsLoding ] = useState(false);
  const [profile] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const id = useParams();

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPackagesByPhotId(id.id));
    setBookingData({
      ...bookingData,
      userId: profile?.userId,
      photographerId: id.id,
    });
    setCustomerData({
      ...customerData,
      fullName: profile.userName,
      email: profile.userMail,
      phoneNo: profile.mobileNumber,
      address: profile.address,
    });
  }, [location]);

  const handelCalendarData = (data) => {
    setCalendarData({
      photographerId: id.id,
      userId: profile?.userId,
      dateTime: data,
      status: "pending",
    });
  };

  const handelPackageData = (packageId) => {
    console.log(packageId);
    setPackageData(
      packages.find((aPackage) => aPackage.packageId == packageId)
    );
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoding(true);
    console.log(bookingData);
    console.log(calendarData);
    console.log(packageData);
    console.log(eventData);
    console.log(calendarData);
    if (
      bookingData &&
      calendarData &&
      packageData &&
      eventData &&
      customerData
    ) {
      dispatch(createCalendarEvent(calendarData));
    }
  };

  useEffect(() => {
    if (bookingData && aCalendar && packageData && eventData && customerData) {
      dispatch(
        createBooking(
          {
            ...bookingData,
            calendarId: aCalendar.id,
            customerRequestDto: customerData,
            eventRequestDto: eventData,
            packageRequestDto: packageData,
          },
          navigate
        )
      );
      setIsLoding(false);
    }
  }, [aCalendar]);

  return (
    <div className="booking_form_container">
      <div className="titel_container">
        <div className="titel">Select Package</div>
        <div className="titel_line" />
      </div>

      <div className="packages_container">
        <div className="packages_card_container">
          <Grid
            key={profile?.userId}
            container
            direction={"row"}
            justifyContent={"space-evenly"}
          >
            {packages?.map((pack) => (
              <Grid key={pack.packageId} item xm={4}>
                <div className="package_card">
                  <p>{pack.packageTittle}</p>
                  <input
                    type="radio"
                    onChange={(e) => handelPackageData(e.target.value)}
                    value={pack.packageId}
                    name="type"
                    className="package_radio"
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <div className="titel_container">
        <div className="titel">Select Date </div>
        <div className="titel_line" style={{ width: "1075.05px" }}></div>
      </div>

      <div className="calander_container">
        <Calendar id={id.id} handelCalendarData={handelCalendarData} />
      </div>

      <div className="titel_container">
        <div className="titel">Add Your Information </div>
        <div className="titel_line" style={{ width: "983.54px" }}></div>
      </div>

      <div className="booking_information_container">
        <div className="information_container">
          <div className="textBox_column">
            <div className="info_text_box">
              <p>Full Name</p>
              <input
                value={customerData?.fullName}
                onChange={(e) =>
                  setCustomerData({ ...customerData, fullName: e.target.value })
                }
                type="text"
                name="text"
                className="text_box"
              />
            </div>

            <div className="info_text_box">
              <p>Email</p>
              <input
                value={customerData?.email}
                onChange={(e) =>
                  setCustomerData({ ...customerData, email: e.target.value })
                }
                type="text"
                name="text"
                className="text_box"
              />
            </div>

            <div className="info_text_box">
              <p>Wedding Location</p>
              <input
                type="text"
                onChange={(e) =>
                  setEventData({ ...eventData, locating: e.target.value })
                }
                value={eventData?.locating}
                name="text"
                className="text_box"
              />
            </div>
          </div>
          <div className="textBox_column">
            <div className="info_text_box">
              <p>Mobile</p>
              <input
                pattern="[0-9]{1}[0-9]{9}"
                value={customerData?.phoneNo}
                onChange={(e) =>
                  setCustomerData({ ...customerData, phoneNo: e.target.value })
                }
                type="number"
                name="text"
                className="text_box"
              />
            </div>

            <div className="info_text_box">
              <p>Address</p>
              <input
                value={customerData?.address}
                onChange={(e) =>
                  setCustomerData({ ...customerData, address: e.target.value })
                }
                type="text"
                name="text"
                className="text_box"
              />
            </div>

            <div className="info_text_box">
              <p>Wedding Start Time</p>
              <input
                type="time"
                onChange={(e) =>
                  setEventData({ ...eventData, time: e.target.value })
                }
                value={eventData?.time}
              />
            </div>
          </div>
        </div>
        <div className="info_textarea">
          <p>Message</p>
          <textarea
            name="postContent"
            value={customerData?.message}
            onChange={(e) =>
              setCustomerData({ ...customerData, message: e.target.value })
            }
            rows={15}
            cols={40}
          />
        </div>
      </div>
      <br />
      <br />
      <div className="titel_container">
        <div className="titel">Payment Information </div>
        <div className="titel_line" style={{ width: "978.35px" }}></div>
      </div>

      {/* <div className="packset2">
        <div className="packset21">
          <div className="textbxset">
            Card Number
            <input type="text"  name="text" className="textbox" />
          </div>
          <div className="textbxset">
            Name of Card
            <input type="text" name="text" className="textbox" />
          </div>
       
          <div className="textbxset">
            Expire Date
            <input type="text" name="text" className="textbox" />
          </div>                    
          <div className="textbxset">
            CVV
              <input type="text" name="text" className="textbox1" />
          </div>
           
          <div className="button1">Submit</div>
        </div>
      </div> */}

      <div className="button_container">
        {isLoding ? (
          <CircularProgress />
        ) : (
          packages?.length > 0 && <button onClick={handelSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Form;
