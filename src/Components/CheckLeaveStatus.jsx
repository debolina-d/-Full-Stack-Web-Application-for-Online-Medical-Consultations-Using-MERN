import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";
import Faq from "./Faq.jsx";
import ContactUs from "./ContactUs.jsx";


const CheckLeaveStatus = () => {
    const [leaves, setLeaves] = useState([]);
    const navigate = useNavigate();
    const { did } = useParams();
    console.log("DoctorID:", did);
    async function fetchLeaves() {
        try {
            const res = await axios.get(`http://localhost:5000/api/fetchLeaves/${did}`);
            setLeaves(res.data);
        } catch (err) {
            console.error("Error fetching leaves:", err);
        }
    }

    useEffect(() => {
        fetchLeaves();
    }, []);

    return (
        <div className="parent-container">
            <div><DoctorNavbar doctorId={did} /></div>
            <div>
                <h2>Leave Status</h2>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {leaves.length === 0 ? (
                            <tr>
                                <td colSpan="7"><center style={{ color: 'red' }}>No leave requests found.</center></td>
                            </tr>
                        ) : (
                            leaves.map((leave) => (
                                <tr key={leave._id}>
                                    <td>{leave.leaveType}</td>
                                    <td>{leave.fromDate}</td>
                                    <td>{leave.toDate}</td>
                                    <td>{leave.reason}</td>
                                    <td style={{
                                        color: leave.status === "Approved"
                                            ? "green"
                                            : leave.status === "Rejected"
                                                ? "red"
                                                : "black"
                                    }}>
                                        {leave.status}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
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

export default CheckLeaveStatus;
