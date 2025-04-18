import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import AdminNavbar from "./AdminNavbar";
import FAQ from "./Faq";
import ContactUs from "./ContactUs";

const ViewAppointments = () => {
  const location = useLocation();
  const patientId = location.state?.patientId || "123456"; // 🔹 Default Patient ID
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/viewAppointments`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchAppointments();
  }, [patientId]);

  if (loading) return <h2>Loading...</h2>;
  if (appointments.length === 0) return <h2>No Scheduled Appointments</h2>;

  return (
    <div className="parent-container">
              <div>
                <AdminNavbar />
              </div>
    <div className="appointments-container">
  <h2>Your Scheduled Appointments</h2>
  <table className="appointment-table">
    <thead>
      <tr>
        <th>Doctor</th>
        <th>Patient</th>
        <th>Date</th>
        <th>Slot</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {appointments.map((appointment) => (
        <tr key={appointment.id}>
          <td>{appointment.doctor_id.name}</td>
          <td>{appointment.patient_id.name}</td>
          <td>{appointment.date}</td>
          <td>{appointment.slot}</td>
          <td>{appointment.time}</td>
          <td>{appointment.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div>
          <FAQ /></div><div>
          <ContactUs />
          </div>
    </div>
  );
};

export default ViewAppointments;