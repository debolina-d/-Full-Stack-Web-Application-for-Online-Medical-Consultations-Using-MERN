import React from "react";
import { useParams } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";
import HealthBanner from "./HealthBanner";
import Faq from "./Faq.jsx";
import ContactUs from "./ContactUs.jsx";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const {did} = useParams();
  const navigate = useNavigate();
  return (
    <div className="parent-container">
      <div>
        <DoctorNavbar doctorId={did}/>
      </div>

      <div className="dashboard-container">
        <div id="dashboard">
          <HealthBanner />
        </div>

        {/* Cards Section */}
        <div className="cards-container">
          {/* Upcoming Appointments Card */}
          <div className="dashboard-card">
            <h3>Upcoming Appointments</h3>
            <p>Check your upcoming patient appointments here.</p>
            <button className="card-button" onClick={() => {
        navigate(`/doctor/appointments/${did}`);
      }}>Upcoming Appointments</button>
          </div>

          {/* Leave Request Card */}
          <div className="dashboard-card">
            <h3>Leave Requests</h3>
            <p>Submit or review leave requests here.</p>
            <button className="card-button" onClick={() => {
        navigate(`/doctor/leave/${did}`);
      }}>Request Leave</button>
          </div>
          {/* Leave Status Card */}
          <div className="dashboard-card">
            <h3>Leave Status</h3>
            <p>Submit or review leave requests here.</p>
            <button className="card-button" onClick={() => {
        navigate(`/doctor/leaveStatus/${did}`);
      }}>Leave Status</button>
          </div>
          
        </div>
      </div>

      <div id="faq">
        <Faq />
      </div>

      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
};

export default DoctorDashboard;
