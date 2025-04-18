import React from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div id="contact" className="contact-container">
      <h2>Contact Us</h2>
      <p>Reach out to our hospital management for any queries.</p>
      
      <div className="contact-details">
        <p><strong>📞 Phone:</strong> +91 98765 43210</p>
        <p><strong>📧 Email:</strong> contact@hospital.com</p>
        <p><strong>🕒 Working Hours:</strong> Mon - Sat: 9:00 AM - 8:00 PM</p>
      </div>
      {/* Social Media Section */}
      <div className="social-media">
        <p><strong>Follow us on:</strong></p>
        <a href="#" className="social-link">
          <FaFacebook size={24} /> Facebook
        </a>
        <a href="#" className="social-link">
          <FaTwitter size={24} /> Twitter
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
