import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Navbar from "./Navbar";
import Faq from "./Faq";
import ContactUs from "./ContactUs";

const BillingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, selectedDate, selectedSlot, pid } = location.state || {};
  const [slot,setSlot] = useState("");
  if (!doctor || !selectedDate || !selectedSlot) {
    return <h2>Invalid Appointment Details</h2>;
  }
  useEffect(() => {
    if (selectedSlot) {
      if (selectedSlot.endsWith("AM")) {
        setSlot("morning");
      } else {
        setSlot("evening");
      }
    }
  }, [selectedSlot]);
  console.log(doctor._id);
  const fees = Number(doctor.fees); 
  const GST_RATE = 0.18;
  const gstAmount = fees* GST_RATE;
  const totalAmount = fees + gstAmount;
  

  const handlePayment = async () => {
    console.log(doctor._id,pid, selectedDate,selectedSlot);
    try {
      await axios.post('http://localhost:5000/api/book-appointment', {
        doctorId: doctor._id,
        patientId: pid,
        date: selectedDate,
        timeSlot: selectedSlot,
        slot:slot
  });

      alert("Payment Successful! Appointment booked.");
      navigate(`/patient/appointments/${pid}`); // Navigate to Scheduled Appointments Page
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Payment failed, please try again.");
    }
  };
  return (
    <div className="parent-container">
    <div><Navbar /></div>
    <div className="billing-container">
      <h1>Your Appointment Bill</h1>
      <p style={{ color: "#000" }}><strong>Doctor:</strong> {doctor.name}</p>
      <p style={{ color: "#000" }}><strong>Time:</strong> {selectedSlot}</p>
      <p style={{ color: "#000" }}><strong>Date:</strong> {selectedDate}</p>
      <p style={{ color: "#000" }}><strong>Consultation Fee:</strong> ₹{doctor.fees}</p>
      <p style={{ color: "#000" }}><strong>GST (18%):</strong> ₹{gstAmount.toFixed(2)}</p>
      <hr />
      <h3 style={{ color: "#000" }}><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</h3>

      <button className="pay-now-button" onClick={handlePayment}>
        Pay Now
      </button>
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

export default BillingPage;