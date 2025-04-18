import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import AppointmentPage from "./AppointmentPage";
import HealthBanner from "./HealthBanner";
import Faq from "./Faq.jsx";
import ContactUs from "./ContactUs.jsx";
import ChatbotPanel from "./ChatbotPanel.jsx";

const PatientDashboard = () => {
  const {pid} = useParams();
  return (
    <div className="parent-container">
    <div>
      <Navbar patientId={pid}/>
    </div>
      <div className="dashboard-container">
        <div>
          <ChatbotPanel />
        </div>
        <div id="dashboard">
          <HealthBanner />
          <AppointmentPage patientId={pid}/>
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

export default PatientDashboard;
