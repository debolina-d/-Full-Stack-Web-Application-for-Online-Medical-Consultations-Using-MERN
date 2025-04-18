import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/"); // Redirect to home or login page
  };
  
  return (
    <nav className="navbar">
        <h2 className="logo">Admin Dashboard</h2>
        <ul className="nav-links">
          <li><a href="/admin/dashboard">Home</a></li>
          <li><a href="#">About</a></li>
          <li className="services-dropdown">
            <a href="#">Services</a>
            <ul className="dropdown">
              <li><Link to={`/admin/viewPatients`}>View Patients</Link></li>
              <li><Link to={`/admin/viewDoctors`}>View Doctors</Link></li>
              <li><Link to={`/admin/viewAppointments`}>View Appointments</Link></li>
              <li><Link to={`/admin/addDoctor`}>Add Doctor</Link></li>
              <li><Link to={`/admin/removeDoctor`}>Remove Doctor</Link></li>
              <li><Link to={`/admin/leaveApproval`}>Leave Approval</Link></li>
            </ul>
          </li>
          <li><a href="#contact">Contact Us</a></li>
          
          <li><a href="#faq">FAQs</a></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
  );
};

export default AdminNavbar;
