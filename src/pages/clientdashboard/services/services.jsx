import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/navbar/navbar";
import "./services.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Services() {
  const user = {
    name: "Neeru",
  };

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://consultancy-management-system-2.onrender.com/api/content/services/"
        );

        console.log("Services:", response.data);

        setServices(response.data);
      } catch (error) {
        console.error("Error loading services:", error);
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookService = (serviceId) => {
    navigate("/client/booking", {
      state: {
        serviceId: serviceId,
      },
    });
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar title="Services" username={user.name} />

        <div className="services-container">
          <h2>Available Services</h2>

          {loading && (
            <p className="services-message">
              Loading services...
            </p>
          )}

          {error && (
            <p className="services-error">
              {error}
            </p>
          )}

          {!loading && !error && services.length === 0 && (
            <p className="services-message">
              No services are available yet.
            </p>
          )}

          {!loading && !error && services.length > 0 && (
            <div className="services-grid">
              {services.map((service) => (
                <div className="service-card" key={service.id}>

                  {service.image_url && (
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="service-image"
                    />
                  )}

                  <h3>{service.name}</h3>

                  <p>{service.description}</p>

                  <button
                    onClick={() =>
                      handleBookService(service.id)
                    }
                  >
                    Book Service
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Services;
