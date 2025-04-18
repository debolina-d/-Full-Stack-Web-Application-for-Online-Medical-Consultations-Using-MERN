import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Navbar from "./Navbar";
import Faq from "./Faq";
import ContactUs from "./ContactUs";

const ScheduledAppointments = () => {
  const { pid } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/appointments/${pid}`);
        setAppointments(response.data); // Set response.data correctly
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchAppointments();
  }, [pid]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="parent-container">
      <div><Navbar patientId={pid} /></div>
      <div className="appointments-container">
        <h2>Your Scheduled Appointments</h2>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Time</th>
              <th>Meeting Link</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <center style={{ color: "red" }}>
                    No scheduled appointments found.
                  </center>
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  {/* Use optional chaining to prevent errors when doctor_id is null */}
                  <td>{appointment.doctor_id?.name || "N/A"}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.slot}</td>
                  <td>{appointment.time}</td>
                  {
                  appointment.meetingLink?(
                  <td>{appointment.meetingLink}</td>):(<td>-</td>)
                }
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <ContactUs />
      </div>
    </div>
  );
};

export default ScheduledAppointments;
