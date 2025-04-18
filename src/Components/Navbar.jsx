import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";

const Navbar = (props) => {
  const [patientData, setPatientData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.patientId) return;
    const fetchPatientData = async () => {
      try {
        console.log("Patient : ",props.patientId);
        const res = await axios.get(`http://localhost:5000/api/patient/${props.patientId}`);
        setPatientData(res.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

      fetchPatientData();
  }, [props.patientId]);
  
  const handleLogout = () => {
    navigate("/"); // Redirect to home or login page
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Patient Dashboard</h2>
      <ul className="nav-links">
        <li>
          <Link to={`/patient/dashboard/${props.patientId}`}>Home</Link>
        </li>
        <li><a href="#">About</a></li>

        {/* Services Dropdown */}
        <li className="services-dropdown">
          <a href="">Services</a>
          <ul className="dropdown">
            <li>
              <Link to={`/patient/medicalHistory/${props.patientId}`}>Medical History</Link>
            </li>
            <li>
              <Link to={`/patient/prescription/${props.patientId}`}>Diagnosis/Prescription</Link>
            </li>
            <li>
              <Link to={`/patient/appointments/${props.patientId}`}>Scheduled Appointment</Link>
            </li>
          </ul>
        </li>

        <li><a href="#contact">Contact Us</a></li>
        {/* Profile Dropdown */}
        <li className="services-dropdown">
          <a href="">Profile</a>
          <ul className="dropdown">
            {patientData &&
            <li>
            {patientData.name}
            </li>}
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </li>
        <li><a href="#faq">FAQs</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
