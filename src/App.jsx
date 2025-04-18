import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PatientDashboard from "./Components/PatientDashboard";
import LoginPage from "./Components/LoginPage";
import DoctorDetails from "./Components/DoctorDetails";
import BillingPage from "./Components/BillingPage";
import ScheduledAppointments from "./Components/ScheduledAppointments";
import DoctorDashboard from "./Components/DoctorDashboard";
import DoctorUpcomingAppointments from "./Components/DoctorUpcomingAppointments";
import ApplyLeave from "./Components/ApplyLeave";
import CheckLeaveStatus from "./Components/CheckLeaveStatus";
import MedicalHistoryForm from "./Components/MedicalHistoryForm";
import MedicalHistoryPage from "./Components/MedicalHistoryPage";
import PrescriptionTable from "./Components/PrescriptionTable";
import DiagnosisForm from "./Components/DiagnosisForm";
import AdminDashboard from "./Components/AdminDashboard";
import ViewPatients from "./Components/ViewPatients";
import ViewDoctors from "./Components/ViewDoctors";
import ViewAppointments from "./Components/ViewAppointments";
import AddDoctor from "./Components/AddDoctor";
import RemoveDoctorPage from "./Components/RemoveDoctorPage";
import LeaveApproval from "./Components/LeaveApproval";




function App() {
  return (
    <div className="app-container">
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/patient/dashboard/:pid" element={<PatientDashboard />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/patient/appointments/:pid" element={<ScheduledAppointments />} />
        <Route path="/patient/medicalHistory/:pid" element={<MedicalHistoryForm />} />
        <Route path="/patient/prescription/:pid" element={<PrescriptionTable />} />
        <Route path="/patient/displayMedicalHistory/:pid/:did" element={<MedicalHistoryPage />} />
        <Route path="/doctor/:did/:pid" element={<DoctorDetails />} />
        <Route path="/doctor/dashboard/:did" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments/:did" element={<DoctorUpcomingAppointments/>} />
        <Route path="/doctor/diagnosis/:pid/:did" element={<DiagnosisForm />} />
        <Route path="/doctor/leave/:did" element={<ApplyLeave />} />
        <Route path="/doctor/leaveStatus/:did" element={<CheckLeaveStatus />} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/viewPatients/" element={<ViewPatients />} />
        <Route path="/admin/viewDoctors/" element={<ViewDoctors />} />
        <Route path="/admin/viewAppointments/" element={<ViewAppointments />} />
        <Route path="/admin/addDoctor/" element={<AddDoctor />} />
        <Route path="/admin/removeDoctor" element={<RemoveDoctorPage />} />
        <Route path="/admin/leaveApproval" element={<LeaveApproval />} />


        
      </Routes>
    </div>
  );
}

export default App;
