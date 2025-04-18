import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useParams } from 'react-router-dom';
import DoctorNavbar from "./DoctorNavbar";
import Faq from "./Faq.jsx";
import ContactUs from "./ContactUs.jsx";


const ApplyLeave = () => {
  const {did}=useParams();

  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/apply-leave', {
        did,
        leaveType,
        fromDate,
        toDate,
        reason,
      });

      if (response.data.success) {
        setMessage('Leave application submitted!');
        setLeaveType('');
        setFromDate('');
        setToDate('');
        setReason('');
      } else {
        setMessage(' Failed to apply for leave.');
      }
    } catch (err) {
      console.error('Error applying for leave:', err);
      setMessage(' Server error. Try again later.');
    }
  };

  return (
    <div className="parent-container">
          <div><DoctorNavbar doctorId={did}/></div>
    <div className="leave-container">
        
      <form className="leave-form" onSubmit={handleSubmit}>
        <h2>Apply for Leave</h2>

        {message && <p className="message">{message}</p>}

        <div className="form-group">
          <label>Leave Type</label>
          <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required>
            <option value="">Select</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
          </select>
        </div>

        <div className="form-group">
          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
          
        </div>

        <div className="form-group">
          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Write your reason here..."
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit Leave</button>
      </form>
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

export default ApplyLeave;
