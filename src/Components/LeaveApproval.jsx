import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import FAQ from "./Faq";
import ContactUs from "./ContactUs";
import AdminNavbar from "./AdminNavbar";

const LeaveApproval = ({ closePanel }) => {
    const [leaves, setLeaves] = useState([]);
    const navigate = useNavigate();
    const fetchLeaves = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/fetchLeaves");
            setLeaves(res.data);
        } catch (err) {
            console.error("Error fetching leaves:", err);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/leaves/${id}/status`, { status });
            fetchLeaves(); // Refresh list
        } catch (err) {
            console.error("Failed to update status");
        }
    };

    return (
        <div className="parent-container">
                      <div>
                        <AdminNavbar />
                      </div>
        <div>
            <h2>Doctor Leave Requests</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Reason</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {leaves.length === 0 ? (
                        <tr>
                            <td colSpan="7">No leave requests found.</td>
                        </tr>
                    ) : (
                        leaves.map((leave) => (
                            <tr key={leave._id}>
                                <td>{leave.doctor_id?.name || "Unknown Doctor"}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.fromDate}</td>
                                <td>{leave.toDate}</td>
                                <td>{leave.reason}</td>
                                <td>
                                    <button
                                        className="approve-btn"
                                        onClick={() => handleStatusUpdate(leave._id, "Approved")}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="reject-btn"
                                        onClick={() => handleStatusUpdate(leave._id, "Rejected")}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
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

export default LeaveApproval;
