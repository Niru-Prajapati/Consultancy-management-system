import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import destination1 from "../images/destination1.png";
import destination2 from "../images/destination2.png";
import destination3 from "../images/destination3.png";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <section className="destinations">

  <h2>Popular Study Destinations</h2>

  <p className="destination-text">
    Explore top countries preferred by thousands of international students every year.
  </p>

  <div className="destination-container">

    <div className="destination-card">
      <img src={destination1} alt="Canada" />
      <h3>Canada</h3>
      <p>
        World-class education, affordable tuition fees, and excellent career opportunities.
      </p>
    </div>

    <div className="destination-card">
      <img src={destination2} alt="Australia" />
      <h3>Australia</h3>
      <p>
        Study in globally recognized universities with a multicultural environment.
      </p>
    </div>

    <div className="destination-card">
      <img src={destination3} alt="USA" />
      <h3>United States</h3>
      <p>
        Home to prestigious universities, innovation, and outstanding research opportunities.
      </p>
    </div>

  </div>

</section>
      <Footer />
    </>
  );
}

export default Home;
