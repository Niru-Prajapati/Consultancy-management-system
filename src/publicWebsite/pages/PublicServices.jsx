import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/PublicServices.css";

import service1 from "../images/service1.png";
import service2 from "../images/service2.png";
import service3 from "../images/service3.png";
import service4 from "../images/service4.png";
import service5 from "../images/service5.png";
import service6 from "../images/service6.png";
import service7 from "../images/service7.png";

function PublicServices() {
  return (
    <>
      <Navbar />

      <section className="services">

        <div className="services-heading">

          <span>OUR SERVICES</span>

          <h1>
            Comprehensive Support <br />
            For Your Study Abroad Journey
          </h1>

          <p>
            We provide end-to-end guidance to make your dream of studying abroad
            smooth, successful, and stress-free.
          </p>

        </div>

        <div className="services-intro">

          <div className="services-text">

            <h2>Your Success Starts Here</h2>

            <p>
              Our experienced consultants provide personalized support at every
              stage—from career counseling and university selection to visa
              processing and post-arrival assistance. We ensure every student
              receives expert guidance tailored to their goals.
            </p>

          </div>

          <div className="services-image">

            <img src={service1} alt="Study Abroad Services" />

          </div>

        </div>

        <div className="service-grid">

          <div className="service-card">

            <img src={service2} alt="" />

            <h3>Career Counselling</h3>

            <p>
              Personalized guidance to help students choose the right course,
              country, and university.
            </p>

          </div>

          <div className="service-card">

            <img src={service3} alt="" />

            <h3>University Applications</h3>

            <p>
              Complete assistance with university applications and required
              documentation.
            </p>

          </div>

          <div className="service-card">

            <img src={service4} alt="" />

            <h3>Visa Assistance</h3>

            <p>
              Professional visa documentation, interview preparation, and expert
              guidance.
            </p>

          </div>

          <div className="service-card">

            <img src={service5} alt="" />

            <h3>Interview Preparation</h3>

            <p>
              Build confidence through mock interviews and personalized coaching.
            </p>

          </div>

          <div className="service-card">

            <img src={service6} alt="" />

            <h3>Scholarship Support</h3>

            <p>
              Explore scholarship opportunities and financial aid options to
              reduce study expenses.
            </p>

          </div>

          <div className="service-card">

            <img src={service7} alt="" />

            <h3>Post Arrival Support</h3>

            <p>
              Assistance with accommodation, airport pickup, and settling into
              your new destination.
            </p>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default PublicServices;
