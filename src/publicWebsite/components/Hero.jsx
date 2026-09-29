import "./../styles/Hero.css";

import heroImage from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-text">
        <h1>
          Your Journey to <br />
          <span>Study Abroad</span> Starts Here
        </h1>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="Study Abroad" />
      </div>

      <div className="hero-description">
        <p>
          Expert guidance for admissions, visas, scholarships and career
          planning to help you achieve your dream of studying abroad.
        </p>
      </div>

      <div className="hero-gallery">

        <img src={img2} alt="Consultation" />

        <img src={img3} alt="Application" />

        <img src={img4} alt="Visa" />

      </div>

    </section>
  );
}

export default Hero;
