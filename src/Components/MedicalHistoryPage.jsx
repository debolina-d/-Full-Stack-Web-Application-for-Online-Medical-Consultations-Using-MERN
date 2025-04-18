import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file
import { useParams } from 'react-router-dom';
import DoctorNavbar from "./DoctorNavbar";
import Faq from "./Faq.jsx";
import ContactUs from "./ContactUs.jsx";


const MedicalHistoryPage = () => {
    const {pid,did}=useParams();
    console.log("ID: ",pid);
  const [medicalHistory, setMedicalHistory] = useState(null);

  useEffect(() => {
    // Fetch medical history data from the backend
    axios.get(`http://localhost:5000/api/medical-history/${pid}`) // Assuming this is the endpoint
      .then((response) => {
        console.log("Response:", response.data);
        setMedicalHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching medical history data', error);
      });
  }, []);


  return (
    
        <div className="parent-container">
          <div><DoctorNavbar doctorId={did}/></div>
    <div className="medical-history-container">
      <h1>Medical History</h1>
      {!medicalHistory ? (
        <center style={{ color: 'red' }}>No medical history data found.</center>
      ) : (
      <table>
        <tbody>
          <tr>
            <td><strong>Full Name:</strong></td>
            <td>{medicalHistory.fullName}</td>
          </tr>
          <tr>
            <td><strong>Age:</strong></td>
            <td>{medicalHistory.age}</td>
          </tr>
          <tr>
            <td><strong>Blood Group:</strong></td>
            <td>{medicalHistory.bloodGroup}</td>
          </tr>
          <tr>
            <td><strong>Contact:</strong></td>
            <td>{medicalHistory.contact}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{medicalHistory.email}</td>
          </tr>
          <tr>
            <td><strong>Emergency Contact:</strong></td>
            <td>{medicalHistory.emergencyContact}</td>
          </tr>
          <tr>
            <td><strong>Medical Conditions:</strong></td>
            <td>{medicalHistory.medicalConditions}</td>
          </tr>
          <tr>
            <td><strong>Medications:</strong></td>
            <td>{medicalHistory.medications}</td>
          </tr>
          <tr>
            <td><strong>Allergies:</strong></td>
            <td>{medicalHistory.allergies}</td>
          </tr>
          <tr>
            <td><strong>Surgeries:</strong></td>
            <td>{medicalHistory.surgeries}</td>
          </tr>
          <tr>
            <td><strong>Genetic Diseases:</strong></td>
            <td>{medicalHistory.geneticDiseases}</td>
          </tr>
          <tr>
            <td><strong>Chronic Illness:</strong></td>
            <td>{medicalHistory.chronicIllness}</td>
          </tr>
          <tr>
            <td><strong>Recent Vaccines:</strong></td>
            <td>{medicalHistory.recentVaccines}</td>
          </tr>
          <tr>
            <td><strong>Flu Shot:</strong></td>
            <td>{medicalHistory.fluShot}</td>
          </tr>
          <tr>
            <td><strong>Smoking:</strong></td>
            <td>{medicalHistory.smoking}</td>
          </tr>
          <tr>
            <td><strong>Alcohol:</strong></td>
            <td>{medicalHistory.alcohol}</td>
          </tr>
          <tr>
            <td><strong>Exercise:</strong></td>
            <td>{medicalHistory.exercise}</td>
          </tr>
          <tr>
            <td><strong>Diet:</strong></td>
            <td>{medicalHistory.diet}</td>
          </tr>
          <tr>
            <td><strong>Pregnancies:</strong></td>
            <td>{medicalHistory.pregnancies}</td>
          </tr>
          <tr>
            <td><strong>Menstrual Cycle:</strong></td>
            <td>{medicalHistory.menstrualCycle}</td>
          </tr>
          <tr>
            <td><strong>Symptoms:</strong></td>
            <td>{medicalHistory.symptoms}</td>
          </tr>
          <tr>
            <td><strong>Symptom Duration:</strong></td>
            <td>{medicalHistory.symptomDuration}</td>
          </tr>
          <tr>
            <td><strong>Created At:</strong></td>
            <td>{new Date(medicalHistory.createdAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    )}
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

export default MedicalHistoryPage;
