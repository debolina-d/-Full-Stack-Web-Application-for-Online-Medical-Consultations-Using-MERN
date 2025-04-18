import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Navbar from "./Navbar";
import Faq from "./Faq";
import ContactUs from "./ContactUs";

const PrescriptionTable = () => {
  const { pid } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/patient/prescriptions/${pid}`);
        setPrescriptions(res.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [pid]);

  const viewPrescription = (id) => {
    const found = prescriptions.find((p) => p._id === id);
    console.log(found);
    setSelectedPrescription(found);
  };


  return (
    <div className="parent-container">
      <div><Navbar patientId={pid} /></div>
      <div className="prescription-container">
        <h2>Prescriptions</h2>
        <table className="prescription-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
          {prescriptions.length === 0 ? (
                            <tr>
                                <td colSpan="7"><center style={{ color: 'red' }}>No prescriptions found.</center></td>
                            </tr>
                        ) : (prescriptions.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.doctor_id.name}</td>
                <td>{p.date}</td>
                <td>
                  <button onClick={() => viewPrescription(p._id)}>View</button>
                </td>
              </tr>
            )))}

          </tbody>
        </table>

        {selectedPrescription && (
          <div className="prescription-details">
            <h3>Prescription Details</h3>
            <p><strong>Doctor:</strong> {selectedPrescription.doctor_id.name}</p>
            <p><strong>Date:</strong> {selectedPrescription.date}</p>
            <p><strong>Diagnosis:</strong> {selectedPrescription.diagnosis}</p>
            <p><strong>Medicines:</strong> {selectedPrescription.prescription}</p>
            <p><strong>Notes:</strong> {selectedPrescription.notes}</p>
          </div>
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

export default PrescriptionTable;
