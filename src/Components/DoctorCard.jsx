import { useNavigate } from "react-router-dom";

const DoctorCard = (props) => {
  
  const navigate = useNavigate();

  return (
    <div className="doctor-card">
      <h3>{props.doctor.name}</h3>
      <p><strong>Qualification:</strong> {props.doctor.qualification}</p>
      <button onClick={() => {
        navigate(`/doctor/${props.doctor._id}/${props.patientId}`);
      }}>View</button>
    </div>
  );
};

export default DoctorCard;