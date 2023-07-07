import React from "react";
import "./about.css";
import chat from "../../../assest/chat.png";
import edit from "../../../assest/edit.png";
import suprice from "../../../assest/suprice.png";

const about = () => {
  return (
    <div className="about" id="about">
      <div className="about_title">
        <h1>We provides better service for make your dream day perfect</h1>
        <div className="about_info_container">
          <div className="about_info_container_chat">
            <div className="about_info_container_chatimage">
              <img src={chat} alt="chat" />
            </div>
            <h3>Chat before the shoot</h3>
            <p>
              We put you in direct contact with your photographer so you can
              have a helpful conversation ahead of the shoot. Discuss ideas,
              define your vision, and find out how to prepare.
            </p>
          </div>
          <div className="about_info_container_editing">
            <div className="about_info_container_editimage">
              <img src={edit} alt="chat" />
            </div>
            <h3>Track My Photographer</h3>
            <p>
              We allow clients to monitor the status and ability to track their
              photographer's arrival time, view their current location, and
              receive notifications when they are on their way or have arrived
              at the photoshoot location.
            </p>
          </div>
          <div className="about_info_container_suprice">
            <div className="about_info_container_supriceimage">
              <img src={suprice} alt="chat" />
            </div>
            <h3>Arrange as you wish</h3>
            <p>
              We allow clients to book a photographer for creating a booking
              form that collects information from clients about their
              photography needs and preferences, such as the type of
              photography, location, and time. The procedure may also include
              setting up a payment system to secure the booking, as well as
              confirming the details of the booking with the photographer and
              the client.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
