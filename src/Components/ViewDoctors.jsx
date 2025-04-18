import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import AdminNavbar from "./AdminNavbar";
import FAQ from "./Faq";
import ContactUs from "./ContactUs";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/viewDoctors").then((res) => {
      setDoctors(res.data);
    });
  }, []);

  return (
    <div className="parent-container">
          <div>
            <AdminNavbar  />
          </div>
    <div className="view-page-container">
      <h2 className="section-title">Doctor Details</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Qualification</th>
            <th>Experience</th>
            <th>Languages</th>
            <th>Fees</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.name}</td>
              <td>{doc.department}</td>
              <td>{doc.qualification}</td>
              <td>{doc.experience} yrs</td>
              <td>{doc.languages.join(", ")}</td>
              <td>₹{doc.fees}</td>
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

export default ViewDoctors;
