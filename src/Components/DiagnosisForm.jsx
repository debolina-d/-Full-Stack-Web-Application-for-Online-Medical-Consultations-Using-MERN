import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file
import { useParams } from 'react-router-dom';
import DoctorNavbar from "./DoctorNavbar";
import Faq from "./Faq.jsx";
import ContactUs from "./ContactUs.jsx";

const DiagnosisForm = ({ appointment, onClose }) => {
    const {pid,did} = useParams();
    const [form, setForm] = useState({
      diagnosis: '',
      prescription: '',
      notes: ''
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
      try {
        await axios.post(`http://localhost:5000/api/doctor/diagnosis/${pid}/${did}`, {
          ...form
        });
        alert("Diagnosis saved!");
      } catch (error) {
        console.error("Error saving diagnosis", error);
      }
    };
  
    return (
      <div className="parent-container">
                <div><DoctorNavbar doctorId={did}/></div>
      <div className="diagnosis-form">
        <h3>Diagnosis And Prescription</h3>
        <textarea name="diagnosis" placeholder="Diagnosis" onChange={handleChange} />
        <textarea name="prescription" placeholder="Prescription" onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
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
  
export default DiagnosisForm;