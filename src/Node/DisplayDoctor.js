import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from 'axios';
import { useState } from "react";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
import { fileURLToPath } from 'url';

// These lines replace __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const OPENROUTER_API_KEY = "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";

// const mongoose = require("mongoose");

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
// const cors = require("cors");

// Middleware
app.use(express.json()); // Allows JSON request handling
app.use(cors());


const schema = mongoose.Schema;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ClinicalConsultancy")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

//Medical History Form
const medicalHistorySchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
  // Personal Details
  fullName: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  bloodGroup: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  emergencyContact: { type: String },

  // Medical History
  medicalConditions: { type: String },
  medications: { type: String },
  allergies: { type: String },
  surgeries: { type: String },

  // Family Medical History
  geneticDiseases: { type: String },
  chronicIllness: { type: String },

  // Immunization Records
  recentVaccines: { type: String },
  fluShot: { type: String },

  // Lifestyle
  smoking: { type: String },
  alcohol: { type: String },
  exercise: { type: String },
  diet: { type: String },

  // Reproductive History
  pregnancies: { type: String },
  menstrualCycle: { type: String },

  // Current Symptoms
  symptoms: { type: String },
  symptomDuration: { type: String },

  // Optional: Timestamp
  createdAt: { type: Date, default: Date.now }
});

const medical = mongoose.model('medical', medicalHistorySchema);

// Define Department Schema & Model
const deptSchema = new schema({
    dept_name: String,
    desc: String
});
const department = mongoose.model("department", deptSchema);

//Admin schema and model
const adminSchema = new mongoose.Schema({
  email: String,
  password: String
});

const admin = mongoose.model("admin", adminSchema);

// Define Doctor Schema & Model
const doctorSchema = new schema({
    name: String,
    email: String,
    qualification: String,
    department: String,
    fees: Number,
    experience: String,
    languages: [String],
    phone:String,
    password:String

});
const doctor = mongoose.model("doctor", doctorSchema);

// Define Appointment Schema & Model
const appointmentSchema = new schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor' },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    date: String,
    slot: String,
    time:String, 
    status: String,
    meetingLink:String
});
const appointment = mongoose.model("appointment", appointmentSchema);

// Define Leave Schema & Model

const leaveSchema = new schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor' },
    leaveType:String,
    fromDate: String, 
    toDate: String,
    reason:String,
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
    
});
const leave = mongoose.model("leave", leaveSchema);

const patientSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    dob: String
  });
  
  const patient = mongoose.model('patient', patientSchema);

  const prescriptionSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
    date: String,
    diagnosis: String,
    prescription: String,
    notes: String
  });
  const prescriptionModel = mongoose.model('prescription', prescriptionSchema);
  
  const approvedLeaveSchema = new mongoose.Schema({
    doctor_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'doctor' },
    leaveType: String,
    fromDate: String,
    toDate: String,
    reason: String,
    approvedOn: { type: Date, default: Date.now }
  });
  
  const ApprovedLeave = mongoose.model('approvedleaves', approvedLeaveSchema);
  
// Fetch All Departments
app.get("/api/patient/view-dept", async(req,res) => {
    try {
        const departments = await department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json("Error fetching departments", error);
    }
});

// Fetch Doctors in a department
app.get(`/api/patient/view-doctors/:departmentName`, async (req,res) => {
    try {
        const departmentName = req.params.departmentName;
        const doctors = await doctor.find({ department: departmentName });
        res.json(doctors);
    } catch (error) {
        res.status(500).json("Error fetching doctors", error);
    }
});

// Get Doctor's availability
app.get("/api/patient/doctor-availability/:doctorId", async (req, res) => {
    
    // Fixed morning and evening slot timings
    const morningSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
    const eveningSlots = ["03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"];
        const doctorId = req.params.doctorId;
        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + 15); // Next 15 days

        // Format date to YYYY-MM-DD
        const formatDate = (date) => date.toISOString().split("T")[0];

        // Generate initial availability for the next 15 days
        let availability = {};
        for (let i = 0; i < 15; i++) {
            let date = new Date();
            date.setDate(today.getDate() + i);
            let formattedDate = formatDate(date);

            availability[formattedDate] = {
                morning: [...morningSlots],
                evening: [...eveningSlots]
            };
        }

        // Fetch booked appointments
        const appointments = await appointment.find({
            doctor_id:doctorId,
            date: { $gte: formatDate(today), $lte: formatDate(endDate) }
        });

        // Fetch leaves
        const leaves = await leave.find({
            doctor_id:doctorId,
            fromDate: { $gte: formatDate(today), $lte: formatDate(endDate) }
        });
        // Remove booked times from availability
        appointments.forEach(({ date, slot, time }) => {
            if (availability[date]) {
                availability[date][slot] = availability[date][slot].filter(t => t !== time);
            }
        });

        // Remove full slots for leaves
        leaves.forEach(({ fromDate, toDate, status }) => {
          if (status === 'Approved') {
              let current = new Date(fromDate);
              const end = new Date(toDate);
      
              while (current <= end) {
                  const year = current.getFullYear();
                  const month = String(current.getMonth() + 1).padStart(2, '0');
                  const day = String(current.getDate()).padStart(2, '0');
                  const dateStr = `${year}-${month}-${day}`; // Ensure it matches availability keys
      
                  if (availability[dateStr]) {
                      delete availability[dateStr];
                  }
      
                  current.setDate(current.getDate() + 1); // Move to next day
              }
          }
      });
      

        // Convert availability object to array format
        const availableSlots = Object.entries(availability).map(([date, slots]) => ({
            date,
            morning: slots.morning,
            evening: slots.evening
        }));

        res.json(availableSlots);
    
});


// GET Doctor by ID Route
app.get("/api/doctor/:id", async (req, res) => {
    try {
        const doc = await doctor.findById(req.params.id);
        if (!doc) {
          return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(doc);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
});

// GET Admin by ID Route
app.get("/api/admin/:id", async (req, res) => {
  try {
      const adminFetched = await admin.findById(req.params.id);
      if (!adminFetched) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.json(adminFetched);
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
  
});

//  Save an appointment when payment is successful
app.post("/api/book-appointment", async (req, res) => {
    try {
        const time = req.body.timeSlot;
        const doctorId = req.body.doctorId;
        const patientId = req.body.patientId;
        const date = req.body.date;
        const slot = req.body.slot;

         // Generate Jitsi link
        const formattedDate = date.replace(/-/g, '');
        const formattedTime = time.replace(/[:\s]/g, '');
        const link = `https://meet.jit.si/Consult_${doctorId}_${formattedDate}_${formattedTime}`;

        if (!doctorId || !patientId || !date || !time || !slot) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        var status = "pending";
        const newAppointment = new appointment({ doctor_id:doctorId, patient_id:patientId, date:date, slot:slot, time:time, status:status, meetingLink:link });
        await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully", newAppointment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Fetch all scheduled appointments for a patient from db
app.get("/api/patient/appointments/:pid", async (req, res) => {
    
    try {
        var pid = req.params.pid;
        // const pid = new mongoose.Types.ObjectId(id);
        const appointments = await appointment.find({ patient_id:pid , status:"pending"}).populate("doctor_id","name");

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// app.get("/api/doctor/appointments/:doctorId", (req, res) => {
//     const doctorId = req.params.doctorId;
//     // Filter appointments matching the doctor ID
//     const doctorAppointments = appointment.filter(app => 
//         app.doctor_id === String(doctorId) && new Date(app.date) >= new Date()
//       );
      
//     if (doctorAppointments.length === 0) {
//         return res.status(404).json({ message: "No appointments found for this doctor" });
//     }
//     res.json(doctorAppointments);
// });


// Assuming you have already imported and connected Mongoose, and defined the `appointment` model

app.get("/api/doctor/appointments/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;
  
  try {
    const appointments = await appointment
      .find({ doctor_id: doctorId ,status: "pending"}) // filter by doctor_id
      .populate("patient_id", "name") // optional: populate patient details
      .sort({ date: 1, time: 1 }); // optional: sort by date and time
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch medical history for a patient
app.get('/api/medical-history/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
      const existingData = await medical.findOne({ patient_id: pid });
        res.status(200).json(existingData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error!' });
    }
  });


// Save or update medical history
app.post('/api/medical-history/:pid', async (req, res) => {
    const pid = req.params.pid;
    const data = req.body;
  
    const dataToInsert = {
      patient_id: pid,
      ...data
    };
  
    try {
      const result = await medical.updateOne(
        { patient_id: pid },
        { $set: dataToInsert },
        { upsert: true }
      );
      res.status(200).json({ message: "Form data saved!", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error!" });
    }
  });

// Get prescriptions by patient ID
app.get("/api/patient/prescriptions/:pid", async (req, res) => {
    const pid = req.params.pid;
    try {
      const prescriptions = await prescriptionModel
        .find({ patient_id: pid }).populate("doctor_id","name");
      res.status(200).json(prescriptions);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
 

app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  let user = null;
  try {
    if (role === "admin") {
      user = await admin.findOne({ email: username });
    } else if (role === "doctor") {
      user = await doctor.findOne({ email: username });
    } else if (role === "patient") {
      user = await patient.findOne({ email: username });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    if (!user || user.password !== password) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    res.json({
      success: true,
      id: user._id
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST route to save diagnosis and prescription
app.post('/api/doctor/diagnosis/:pid/:did', async (req, res) => {
  const { pid, did } = req.params;
  const { diagnosis, prescription, notes } = req.body;
  try {
    const newRecord = new prescriptionModel({
      patient_id: pid,
      doctor_id: did,
      date: new Date().toISOString().slice(0, 10),
      diagnosis,
      prescription,
      notes
    });

    await newRecord.save();
    res.status(201).json({ message: 'Diagnosis saved successfully' });
  } catch (error) {
    console.error("Error saving diagnosis:", error);
    res.status(500).json({ message: 'Failed to save diagnosis' });
  }
});

// Get all the patients for admin
// app.get('/api/admin/patients', async (req, res) => {
//   console.log("hello");
//   try {
//     console.log("HEllo from patient");
//     const patients = await patient.find();
//     res.status(200).json(patients);
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res.status(500).json({ message: 'Failed to fetch patients' });
//   }
// });

// Get all the doctors for admin
app.get('/api/viewDoctors', async (req, res) => {
  try {
    console.log("HEllo from doctor");
    const doctors = await doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
});

// DELETE doctor by ID
app.delete("/api/doctors/:id", async (req, res) => {
  try {
    const {id}=req.params;
    await doctor.findByIdAndDelete({_id:id});
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed", error: err });
  }
});

// Get all the appointments for admin
app.get('/api/viewAppointments', async (req, res) => {
  try {
    console.log("HEllo from appointment");
    const appointments = await appointment.find().populate("doctor_id","name").populate("patient_id","name");
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
});

// Add Doctor Information
app.post('/api/admin/addDoctor', async (req, res) => {
  try {
    // Extract doctor information from the request body
    const { name, email, qualification, department, fees, experience, languages, phone, password } = req.body;

    // Validation: Check if required fields are provided
    if (!name || !email || !qualification || !department || !fees || !experience || !languages || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the doctor already exists
    const existingDoctor = await doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor with this email already exists' });
    }

    // Create a new doctor instance
    const newDoctor = new doctor({
      name,
      email,
      qualification,
      department,
      fees: Number(fees),  // Ensuring fees is stored as a number
      experience: Number(experience), // Ensuring experience is stored as a number
      languages: languages.split(',').map((lang) => lang.trim()),  // Handle languages as an array
      phone,
      password
    });

    // Save the doctor to the database
    await newDoctor.save();

    // Respond with a success message
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: 'Failed to add doctor' });
  }
});

app.post('/api/apply-leave', async (req, res) => {
  const { did, leaveType, fromDate, toDate, reason } = req.body;

  try {
    const mongoLeave = new leave({
      doctor_id: did,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    await mongoLeave.save();
    res.json({ success: true, leave: mongoLeave });
  } catch (err) {
    console.error("DB insert failed:", err); // Log full error
    return res.status(500).json({ success: false, message: "DB insert failed", error: err.message });
  }
});


// fetchLeaverequestsAdmin
app.get('/api/fetchLeaves', async (req, res) => {
  try {
    const leaves = await leave.find({ status: "Pending" }).populate('doctor_id', 'name'); 
    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: 'Failed to fetch patients' });
  }

});
app.get('/api/fetchLeaves/:did', async (req, res) => {
  try {
    const { did } = req.params; 
    const leaves = await leave.find({doctor_id:did});
    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: 'Failed to fetch patients' });
  }

});

app.put('/leaves/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Leave not found' });

    res.status(200).json({ message: `Leave ${status}` });
  } catch (err) {
    console.error('Error updating leave status:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/doctor/appointmentCompleted/:aid', async (req, res) => {
  const aid = req.params.aid;
  try {
    const updatedAppointment = await appointment.findOneAndUpdate(
      {
        _id:aid
      },
      { status: 'completed' }, // Update the status field to 'completed'
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment status updated to completed', appointment: updatedAppointment });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



function isHealthRelated(question) {
  const healthKeywords = [
    'fever', 'pain', 'headache', 'medicine', 'doctor', 'treatment', 'cough', 'cold',
    'flu', 'infection', 'injury', 'nausea', 'vomiting', 'dizziness', 'diarrhea',
    'constipation', 'allergy', 'rash', 'swelling', 'burn', 'fracture', 'bleeding',
    'fatigue', 'sore throat', 'asthma', 'diabetes', 'hypertension', 'blood pressure',
    'heart', 'lung', 'kidney', 'liver', 'cholesterol', 'sugar level', 'pulse',
    'emergency', 'clinic', 'hospital', 'vaccine', 'covid', 'checkup',
    'prescription', 'diagnosis', 'symptom', 'specialist', 'mental health', 'anxiety',
    'depression', 'stress', 'therapy', 'surgeon', 'operation', 'surgery', 'sick', 'not well', 'not feeling'
  ];
  
  return healthKeywords.some(keyword => question.toLowerCase().includes(keyword));
}

app.post('/ask', async (req, res) => {
  const userQuestion = req.body.question;
  if (!userQuestion) {
    return res.status(400).json({ message: '' });
  }
  if (!isHealthRelated(userQuestion)) {
    return res.status(400).json({ message: 'Could not answer this question.' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',  // free-tier supported model
        messages: [{ role: 'user', content: userQuestion }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // required by OpenRouter
          'X-Title': 'ClinicalConsultancyBot',     // any custom title
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ answer: reply });
  } catch (error) {
    console.error('OpenRouter error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Something went wrong with response.' });
  }
});

// Fetch patient by Id
app.get("/api/patient/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const patientMatched = await patient.findById(id);
  console.log(patientMatched.name);
  res.json(patientMatched);
});

// Fetch patient by Id
app.get("/api/viewPatients",  async (req, res) => {
  console.log("demo");
  try {
        console.log("HEllo from patient");
        const patients = await patient.find();
        res.status(200).json(patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: 'Failed to fetch patients' });
      }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));