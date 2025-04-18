import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import FAQ from "./Faq";
import ContactUs from "./ContactUs";
import AdminNavbar from "./AdminNavbar";

const RemoveDoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/viewDoctors").then((res) => {
      setDoctors(res.data);
    });
  }, []);

  const removeDoctor = async (id) => {
    try {
      console.log("ID:",id);
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      alert("Failed to delete doctor");
    }
  };

  return (
    <div className="parent-container">
              <div>
                <AdminNavbar />
              </div>
    <div className="view-page-container">
      <h2 className="section-title">Remove Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors available to remove.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
                <td>{doc.department}</td>
                <td>{doc.qualification}</td>
                <td>{doc.experience} years</td>
                <td>
                  <button onClick={() => removeDoctor(doc._id)} style={{ backgroundColor: "#dc3545" }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    <div>
          <FAQ /></div><div>
          <ContactUs />
          </div>
        </div>
  );
};

export default RemoveDoctorPage;
