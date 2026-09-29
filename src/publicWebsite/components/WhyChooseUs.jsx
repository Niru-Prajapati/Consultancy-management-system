import "../styles/WhyChooseUs.css";

import {
  FaUserGraduate,
  FaPassport,
  FaChartLine,
  FaHandHoldingUsd,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";

function WhyChooseUs() {
  return (
    <section className="why">

      <div className="why-heading">
        <h2>Why Choose Us?</h2>
        <p>
          We make your study abroad journey simple, stress-free, and successful.
        </p>
      </div>

      <div className="why-container">

        <div className="why-card">
          <FaUserGraduate className="icon" />
          <h3>Expert Guidance</h3>
          <p>
            Personalized counseling to help you choose the right university.
          </p>
        </div>

        <div className="why-card">
          <FaPassport className="icon" />
          <h3>Visa Expertise</h3>
          <p>
            Complete visa application support with high approval success.
          </p>
        </div>

        <div className="why-card">
          <FaChartLine className="icon" />
          <h3>High Success Rate</h3>
          <p>
            Hundreds of successful admissions to top universities worldwide.
          </p>
        </div>

        <div className="why-card">
          <FaHandHoldingUsd className="icon" />
          <h3>Scholarship Assistance</h3>
          <p>
            Get guidance on scholarships and financial aid opportunities.
          </p>
        </div>

        <div className="why-card">
          <FaUniversity className="icon" />
          <h3>Top Universities</h3>
          <p>
            Partnerships with globally recognized institutions.
          </p>
        </div>

        <div className="why-card">
          <FaUsers className="icon" />
          <h3>Student Support</h3>
          <p>
            Continuous assistance from application to graduation.
          </p>
        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;
