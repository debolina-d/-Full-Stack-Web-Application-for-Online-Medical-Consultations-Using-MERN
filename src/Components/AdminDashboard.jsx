import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import FAQ from "./Faq";
import ContactUs from "./ContactUs";
import HealthBanner from "./HealthBanner";
import AdminNavbar from "./AdminNavbar";
import { useParams } from "react-router-dom";

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/viewDoctors")
      .then((res) => {
        setDoctors(res.data);
        console.log("Doctors fetched:", res.data);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  
    axios.get("http://localhost:5000/api/viewAppointments")
      .then((res) => {
        setAppointments(res.data);
        console.log("Appointments fetched:", res.data);
      })
      .catch((err) => console.error("Error fetching appointments:", err));


    axios.get("http://localhost:5000/api/viewPatients")
      .then((res) => {
        setPatients(res.data);
        console.log("Patients fetched:", res.data);
      })
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);
  
  return (
    <div className="parent-container">
      <div>
        <AdminNavbar />
      </div>

      <div className="admin-page">
        <div className="dashboard-container" id="dashboard">
          <HealthBanner />
        </div>

        <br /><br />

        <div className="summary-cards">
          <div className="card">
            <p>Total Patients: {patients.length}</p>
            <a href="/admin/viewPatients"><button>View Patients</button></a>
          </div>
          <div className="card">
            <p>Total Doctors: {doctors.length}</p>
            <a href="/admin/viewDoctors"><button>View Doctors</button></a>
          </div>
          <div className="card">
            <p>Total Appointments: {appointments.length}</p>
            <a href="/admin/viewAppointments"><button>View Appointments</button></a>
          </div>
        </div>
      </div>
      <div>
      <FAQ /></div><div>
      <ContactUs />
      </div>
    </div>
  );
};

export default AdminDashboard;
