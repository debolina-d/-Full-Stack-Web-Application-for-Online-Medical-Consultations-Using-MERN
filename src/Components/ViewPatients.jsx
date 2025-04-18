import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import AdminNavbar from "./AdminNavbar";
import FAQ from "./Faq";
import ContactUs from "./ContactUs";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/viewPatients").then((res) => {
      setPatients(res.data);
    });
  }, []);

  return (
    <div className="parent-container">
          <div>
            <AdminNavbar />
          </div>
    <div className="view-page-container">
      <h2 className="section-title">Patient Details</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id || p.email}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>{p.dob}</td>
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

export default ViewPatients;
