import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Faq from "./Faq";
import ContactUs from "./ContactUs";
import { useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  
  const { did } = useParams();
  const {pid} = useParams();
  console.log(pid);
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(""); // State to track selected date
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctor/${did}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();

    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/doctor-availability/${did}`);
        setAvailability(response.data);
      } catch (error) {
        console.error("Error fetching doctor availability details:", error);
      }
    }
    fetchAvailability();
  }, [did]);

  if (loading) return <h2>Loading...</h2>;
  if (!doctor) return <h2>No Doctor Details Available</h2>;

  return (
    <div className="parent-container">
        <div><Navbar /></div>
      
      <div className="container">
      <div className="doctor-details">
        <h2>{doctor.name}</h2>
        <p><strong>Qualification:</strong> {doctor.qualification}</p>
        <p><strong>E-Mail:</strong> {doctor.email}</p>
        <p><strong>Experience:</strong> {doctor.experience} years</p>
        <p><strong>Languages Known:</strong> {doctor.languages.join(", ")}</p>
        <p><strong>Department:</strong> {doctor.department}</p>
        {/* <p><strong>Rating:</strong>  {doctor.rating}</p> */}
        <p><strong>Consultation Fee:</strong> ₹{doctor.fees}</p>
      </div>

      <div className="schedule-container">
      <h2>Available Dates</h2>
      <div className="days">
        {availability.map((d) => (
          <button
            key={d.date}
            className={`day-btn ${selectedDate === d.date ? "selected" : ""}`}
            onClick={() => setSelectedDate(d.date)}
          >
            {d.date}
          </button>
        ))}
      </div>

      {/* Show Slots for Selected Date */}
      {selectedDate && (
        <div className="slots">
        <div>
          <h3>Morning Slots</h3>
        {availability
          .find((d) => d.date === selectedDate)
          ?.morning.map((time) => (
            <button
            key={time}
            className={`day-btn ${selectedSlot=== time ? "selected" : ""}`}
            onClick={() => setSelectedSlot(time)}
          >
              {time}
            </button>
          ))}
        </div>
        <div>
          <h3>Evening Slots</h3>
        {availability
          .find((d) => d.date === selectedDate)
          ?.evening.map((time) => (
            <button
            key={time}
            className={`day-btn ${selectedSlot=== time ? "selected" : ""}`}
            onClick={() => setSelectedSlot(time)}
          >
              {time}
            </button>
          ))}
        </div>
        </div>
      )} 
      {console.log("Selected slot: ",selectedSlot)}
      
        <button className="book-appointment" disabled={!selectedDate || !selectedSlot}
        style={{
            background : (!selectedDate || !selectedSlot) ? "grey" : "green",
          cursor: (!selectedDate || !selectedSlot) ? "not-allowed" : "pointer"
        }}
        onClick={() =>
            navigate("/billing", { state: { doctor, selectedDate, selectedSlot,pid } })
          }
          >

          
          Book Appointment
        </button>
    </div>
    
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

export default DoctorDetails;
