import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import FAQ from "./Faq";
import ContactUs from "./ContactUs";
import AdminNavbar from "./AdminNavbar";

const AddDoctor = () => {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    languages: "",
    department: "",
    fees: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    // Creating the payload to send to the backend
    const payload = {
      ...newDoctor,
      experience: Number(newDoctor.experience),  // Ensure experience is a number
      fees: Number(newDoctor.fees),  // Ensure fees is a number
    };

    try {
      // Sending the payload to the backend
      await axios.post("http://localhost:5000/api/admin/addDoctor", payload);
      alert("Doctor added successfully!");
      navigate("/admin/dashboard"); // Redirect to admin page after success
    } catch (err) {
      alert("Failed to add doctor");
    }
  };

  return (
    <div className="parent-container">
          <div>
            <AdminNavbar />
          </div>
    <div className="view-page-container">
      <h2 className="section-title">Add New Doctor</h2>
      <form onSubmit={handleAddDoctor} className="add-doctor-form">
        <div className="form-group">
          <label>Name</label>
          <input
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            value={newDoctor.email}
            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            value={newDoctor.phone}
            onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Qualification</label>
          <input
            value={newDoctor.qualification}
            onChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Experience (years)</label>
          <input
            type="number"
            value={newDoctor.experience}
            onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Languages (comma-separated)</label>
          <input
            value={newDoctor.languages}
            onChange={(e) => setNewDoctor({ ...newDoctor, languages: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            value={newDoctor.department}
            onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Fees</label>
          <input
            type="number"
            value={newDoctor.fees}
            onChange={(e) => setNewDoctor({ ...newDoctor, fees: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={newDoctor.password}
            onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
          />
        </div>

        <div className="form-actions">
          <button type="submit">Add Doctor</button>
        </div>
      </form>
    </div>
    <div>
          <FAQ /></div><div>
          <ContactUs />
          </div>
        </div>
  );
};

export default AddDoctor;
