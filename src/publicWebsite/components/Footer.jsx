import "../styles/Footer.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>Study Abroad Consultancy</h2>
          <p>
            Helping students achieve their dream of studying abroad with expert
            guidance and personalized support.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>

          <p><FaPhoneAlt /> +977 9812345678</p>

          <p><FaEnvelope /> info@studyabroad.com</p>

          <p><FaMapMarkerAlt /> Kathmandu, Nepal</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
          </div>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Study Abroad Consultancy. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;
