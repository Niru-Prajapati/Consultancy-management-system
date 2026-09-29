import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/About.css";

import about1 from "../images/about1.png";
import about2 from "../images/about2.png";

import team1 from "../images/team1.png";
import team2 from "../images/team2.png";
import team3 from "../images/team3.png";
import team4 from "../images/team4.png";
import team5 from "../images/team5.png";
import team6 from "../images/team6.png";

function About() {
  return (
    <>
      <Navbar />

      <section className="about">

        {/* About Heading */}

        <div className="about-heading">

          <span>ABOUT US</span>

          <h1>
            Guiding Dreams <br />
            Building Futures
          </h1>

        </div>

        {/* About Content */}

        <div className="about-content">

          <div className="about-text">

            <p>
              We are passionate education consultants committed to helping
              students achieve their dream of studying abroad. From selecting the
              perfect university to securing visas and scholarships, we provide
              personalized guidance throughout your journey.
            </p>

          </div>

          <div className="about-image">

            <img src={about1} alt="About" />

          </div>

        </div>

        {/* Services Image */}

        <div className="about-services">

          <img src={about2} alt="Services" />

        </div>

        {/* Team Heading */}

        <div className="team-heading">

          <span>OUR PROFESSIONALS</span>

          <h2>Meet Our Expert Consultants</h2>

          <p>
            Dedicated mentors with years of experience helping students achieve
            their international education goals.
          </p>

        </div>

        {/* Team */}

        <div className="team-grid">

          <div className="team-card">
            <img src={team1} alt="" />
            <h3>Anita Sharma</h3>
            <p>Founder & CEO</p>
          </div>

          <div className="team-card">
            <img src={team2} alt="" />
            <h3>Rohan Thapa</h3>
            <p>Visa Consultant</p>
          </div>

          <div className="team-card">
            <img src={team3} alt="" />
            <h3>Karan Joshi</h3>
            <p>Student Advisor</p>
          </div>

          <div className="team-card">
            <img src={team5} alt="" />
            <h3>Sushma Rai</h3>
            <p>Admission Officer</p>
          </div>

          <div className="team-card">
            <img src={team4} alt="" />
            <h3>Nabin Karki</h3>
            <p>Counsellor</p>
          </div>

          <div className="team-card">
            <img src={team6} alt="" />
            <h3>Ayesha Khan</h3>
            <p>Support Executive</p>
          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default About;
