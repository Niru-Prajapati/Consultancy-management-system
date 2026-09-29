import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Contact.css";

function Contact() {
  return (
    <>
      <Navbar />

      <section className="contact">

        <div className="contact-heading">

          <span>CONTACT US</span>

          <h1>Let's Start Your Journey</h1>

          <p>
            Have questions? Our expert consultants are here to guide you every
            step of your study abroad journey.
          </p>

        </div>

        <div className="contact-container">

          {/* Contact Information */}

          <div className="contact-info">

            <div className="info-box">
              <h3>📍 Address</h3>
              <p>New Baneshwor, Kathmandu, Nepal</p>
            </div>

            <div className="info-box">
              <h3>📞 Phone</h3>
              <p>+977 98XXXXXXXX</p>
            </div>

            <div className="info-box">
              <h3>✉ Email</h3>
              <p>info@studyabroad.com</p>
            </div>

            <div className="info-box">
              <h3>🕒 Office Hours</h3>
              <p>Sunday - Friday</p>
              <p>9:00 AM - 6:00 PM</p>
            </div>

          </div>

          {/* Contact Form */}

          <div className="contact-form">

            <h2>Send Us a Message</h2>

            <form>

              <input
                type="text"
                placeholder="Full Name"
              />

              <input
                type="email"
                placeholder="Email Address"
              />

              <input
                type="text"
                placeholder="Phone Number"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
              ></textarea>

              <button type="submit">
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Google Map */}

      <section className="map-section">

        <h2>Find Us Here</h2>

        <p>
          Visit our office or schedule a consultation with our expert advisors.
        </p>

        <div className="map-container">

          <iframe
            title="Study Abroad Consultancy"
            src="https://www.google.com/maps?q=New+Baneshwor+Kathmandu&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;
