import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";
import Faq from "./Faq.jsx";
import ContactUs from "./ContactUs.jsx";

const DoctorUpcomingAppointments = () => {
  const { did } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    console.log(did);
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctor/appointments/${did}`);
        console.log(response.data);
        // Filter only "upcoming" appointments
        setAppointments(response.data);
      } catch (err) {
        console.error(err);
      }
      
    };
    fetchAppointments();
  }, [did]);

  const navigate = useNavigate();

  const handleMedicalHistoryClick = (pid) => {
    navigate(`/patient/displayMedicalHistory/${pid}/${did}`);
  };
  
  const openDiagnosisForm = (appointment) => {
    navigate(`/doctor/diagnosis/${appointment.patient_id._id}/${did}`);
  };
  
  const markCompleted = async (appointment) => {
    try {
      console.log(appointment._id);
      await axios.get(`http://localhost:5000/api/doctor/appointmentCompleted/${appointment._id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== appointment._id));
      // Optionally refresh the list or update state here
    } catch (error) {
      console.error('Error marking appointment as completed:', error);
      alert('Failed to complete appointment');
    }
  };
  

  return (
    <div className="parent-container">
      <div><DoctorNavbar doctorId={did}/></div>
    <div>
      <h2>Your Scheduled Appointments</h2>
      {
        <table className="appointment-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Time</th>
              <th>Medical History</th>
              <th>Diagnosis/Prescription</th>
              <th>Meeting Link</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
                            <tr>
                                <td colSpan="8"><center style={{ color: 'red' }}>No appointments found.</center></td>
                            </tr>
                        ) : (appointments.map((appointment, index) => (
              <tr key={appointment._id || index}>
                <td>{index + 1}</td>
                <td>{appointment.patient_id?.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.time}</td>
                <td>
                  <button onClick={() => handleMedicalHistoryClick(appointment.patient_id._id)}>Medical History</button>
                </td>
                <td>
                <button onClick={() => openDiagnosisForm(appointment)}>Diagnosis</button>

                </td>
                <td>
                {
                  appointment.meetingLink?(
                  <td>{appointment.meetingLink}</td>):(<td>-</td>)
                }
                </td>
                <td>
                  <button onClick={() => markCompleted(appointment)}>Completed</button>
                </td>

              </tr>
            )))}
          </tbody>
        </table>
      
      }
      

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

export default DoctorUpcomingAppointments;
