import React from "react";

const FAQ = () => {
  return (
    <div className="faq-container" id="faq">
      <h2>Frequently Asked Questions</h2>
      <ul className="faq-list">
        <li>
          <strong>How do I book an online consultation?</strong>
          <p>You can book an online consultation by clicking on the 'Book Appointment' button and selecting a suitable time slot.</p>
        </li>
        <li>
          <strong>What are the consultation charges?</strong>
          <p>Consultation charges vary based on the doctor and specialization. You can check the fees on the booking page.</p>
        </li>
        <li>
          <strong>Can I cancel or reschedule my appointment?</strong>
          <p>Yes, you can reschedule or cancel your appointment from the 'My Appointments' section before 24 hours of the scheduled time.</p>
        </li>
        <li>
          <strong>Is my consultation data secure?</strong>
          <p>Yes, we use end-to-end encryption and follow HIPAA guidelines to ensure your data remains confidential.</p>
        </li>
      </ul>
    </div>
  );
};

export default FAQ;
