import React, { useState , useEffect} from "react";
import DepartmentCard from "./DepartmentCard";
import DoctorCard from "./DoctorCard"; 
import axios from "axios";

// const departments = [
//   { id: 1, name: "Cardiology", description: "Heart-related issues" },
//   { id: 2, name: "Neurology", description: "Brain and nervous system" },
//   { id: 3, name: "Orthopedics", description: "Bones and joints" },
//   { id: 4, name: "Dermatology", description: "Skin and hair" },
// ];

// Mock doctors data
// const doctors = {
//   1: [
//     { id: 101, name: "Dr. A Sharma", experience: "10 years", rating: "4.8" },
//     { id: 102, name: "Dr. B Kapoor", experience: "8 years", rating: "4.6" },
//   ],
//   2: [
//     { id: 201, name: "Dr. C Mehta", experience: "12 years", rating: "4.9" },
//     { id: 202, name: "Dr. D Rao", experience: "7 years", rating: "4.5" },
//   ],
//   3: [
//     { id: 301, name: "Dr. E Verma", experience: "9 years", rating: "4.7" },
//   ],
//   4: [
//     { id: 401, name: "Dr. F Singh", experience: "11 years", rating: "4.8" },
//   ],
// };

const AppointmentPage = (props) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleViewClick = (departmentName) => {
    console.log(departmentName);
    setSelectedDepartment(departmentName);
    setLoading(true);
    const fetchDoctors = async () => {
      try {
        const doctor = await axios.get(`http://localhost:5000/api/patient/view-doctors/${departmentName}`);
        setDoctors(doctor.data);
        console.log(doctors);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }finally {
        setLoading(false); }
    };
    fetchDoctors();

  };


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const dept = await axios.get(`http://localhost:5000/api/patient/view-dept`);
        setDepartments(dept.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchDepartments();
  });

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="appointment-container">
      <h2>Browse by Specialties</h2>
      <div className="department-list">
        {departments.map((dept) => (
          <DepartmentCard key={dept.dept_name} department={dept} onViewClick={handleViewClick} />
        ))}
      </div>

      {selectedDepartment && (
        <div className="doctor-list">
          <h2>Doctors in {departments.find(d => d.dept_name === selectedDepartment).dept_name}</h2>
          <div className="doctor-card-container">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} patientId={props.patientId}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
