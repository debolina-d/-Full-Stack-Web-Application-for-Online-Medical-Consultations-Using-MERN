import React , {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";
import Faq from "./Faq.jsx";
import ContactUs from "./ContactUs.jsx";

const MedicalHistoryForm = () => {
  const { pid } = useParams();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/medical-history/${pid}`);
        if (response.ok) {
          const data = await response.json();
          reset(data);  // pre-fill form
        }
      } catch (error) {
        console.error("Failed to fetch medical history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, [pid, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/medical-history/${pid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        alert("Form submitted and saved successfully!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form.");
    }
  };

  if (loading) return <p>Loading...</p>;


  return (
    <div className="parent-container">
    <div>
      <Navbar patientId={pid}/>
    </div>
    <div className="form-container">
      <h2 className="form-title">Medical History Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">

        {/* Personal Information */}
        <div className="form-section">
          <h3 className="section-title">Personal Details</h3>
          <div className="form-row">
            <div className="form-group-medicalHistory">
              <label className="form-label">Full Name:</label>
              <input {...register("fullName", { required: true })} className="form-input" />
              {errors.fullName && <p className="error-text">Required</p>}
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Age:</label>
              <input type="number" {...register("age", { required: true, min: 0 })} className="form-input" />
              {errors.age && <p className="error-text">Valid age required</p>}
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Blood Group:</label>
              <input {...register("bloodGroup", { required: true })} className="form-input" />
              {errors.bloodGroup && <p className="error-text">Required</p>}
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Contact Number:</label>
              <input {...register("contact", { required: true })} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Email:</label>
              <input type="email" {...register("email", { required: true })} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Emergency Contact:</label>
              <input {...register("emergencyContact")} className="form-input" />
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="form-section">
          <h3 className="section-title">Medical History</h3>
          <div className="form-row">
            <div className="form-group-medicalHistory">
              <label className="form-label">Past Medical Conditions:</label>
              <input {...register("medicalConditions")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Current Medications:</label>
              <input {...register("medications")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Allergies:</label>
              <input {...register("allergies")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Surgeries/Procedures:</label>
              <input {...register("surgeries")} className="form-input" />
            </div>
          </div>
        </div>

        {/* Family History */}
        <div className="form-section">
          <h3 className="section-title">Family Medical History</h3>
          <div className="form-row">
            <div className="form-group-medicalHistory">
              <label className="form-label">Genetic Diseases:</label>
              <input {...register("geneticDiseases")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">History of Chronic Illness:</label>
              <input {...register("chronicIllness")} className="form-input" />
            </div>
          </div>
        </div>

        {/* Immunization */}
        <div className="form-section">
          <h3 className="section-title">Immunization Records</h3>
          <div className="form-row">
            <div className="form-group-medicalHistory">
              <label className="form-label">Recent Vaccines:</label>
              <input {...register("recentVaccines")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Last Flu Shot:</label>
              <input {...register("fluShot")} className="form-input" />
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="form-section">
          <h3 className="section-title">Lifestyle</h3>
          <div className="form-row">
            <div className="form-group-medicalHistory">
              <label className="form-label">Smoking Habits:</label>
              <input {...register("smoking")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Alcohol Consumption:</label>
              <input {...register("alcohol")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Exercise Routine:</label>
              <input {...register("exercise")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Dietary Habits:</label>
              <input {...register("diet")} className="form-input" />
            </div>
          </div>
        </div>

        {/* Reproductive History */}
        <div className="form-section">
          <h3 className="section-title">Reproductive History</h3>
          <div className="form-row">
            <div className="form-group-medicalHistory">
              <label className="form-label">Pregnancies (if applicable):</label>
              <input {...register("pregnancies")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Menstrual Cycle Details:</label>
              <input {...register("menstrualCycle")} className="form-input" />
            </div>
          </div>
        </div>

        {/* Current Symptoms */}
        <div className="form-section">
          <h3 className="section-title">Current Symptoms</h3>
          <div className="form-row">
            <div className="form-group-medicalHistory">
              <label className="form-label">Describe Symptoms:</label>
              <input {...register("symptoms")} className="form-input" />
            </div>

            <div className="form-group-medicalHistory">
              <label className="form-label">Duration of Symptoms:</label>
              <input {...register("symptomDuration")} className="form-input" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    <div id="faq">
      <Faq />
    </div>
    <div id="contact">
      <ContactUs />
    </div>
    </div>
  );
};

export default MedicalHistoryForm;
