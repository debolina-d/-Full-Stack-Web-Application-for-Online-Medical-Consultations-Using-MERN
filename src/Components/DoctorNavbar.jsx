import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const DoctorNavbar = (props) => {
  const [doctorData, setDoctorData] = useState(null);
  
  const navigate = useNavigate();
    useEffect(() => {
      if (!props.doctorId) return;
      const fetchDoctorData = async () => {
        try {
          console.log("Doctor : ",props.doctorId);
          const res = await axios.get(`http://localhost:5000/api/doctor/${props.doctorId}`);
          setDoctorData(res.data);
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      };
  
      fetchDoctorData();
    }, [props.doctorId]);
    const handleLogout = () => {
      navigate("/"); // Redirect to home or login page
    };

  return (
    <nav className="navbar">
          <h2 className="logo">Doctor Dashboard</h2>
          <ul className="nav-links">
            <li>
              <Link to={`/doctor/dashboard/${props.doctorId}`}>Home</Link>
            </li>
            <li><a href="#">About</a></li>
    
            {/* Services Dropdown */}
            <li className="services-dropdown">
              <a href="">Services</a>
              <ul className="dropdown">
                <li>
                  <Link to={`/doctor/appointments/${props.doctorId}`}>Upcoming Appointments</Link>
                </li>
                <li>
                  <Link to={`/doctor/leave/${props.doctorId}`}>Apply for Leave</Link>
                </li>
                <li>
                  <Link to={`/doctor/leaveStatus/${props.doctorId}`}>Leave Status</Link>
                </li>
              </ul>
            </li>
    
            <li><a href="#contact">Contact Us</a></li>
            <li className="services-dropdown">
          <a href="">Profile</a>
          <ul className="dropdown">
            {doctorData &&
            <li>
            {doctorData.name}
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
export default DoctorNavbar;
