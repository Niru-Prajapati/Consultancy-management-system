import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/navbar/navbar";
import "./booking.css";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

function Booking() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");

  const timeSlots = [
    "9:00 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
  ];

  // Get logged-in user's name and email
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setProfileError("Please login first.");
        setLoadingProfile(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://consultancy-management-system-2.onrender.com/api/accounts/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Profile received:", response.data);

        setUser({
          name: response.data.full_name,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error loading profile:", error);
        setProfileError("Unable to load your profile.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Get services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        setServiceError("");

        const response = await axios.get(
          "https://consultancy-management-system-2.onrender.com/api/content/services/"
        );

        console.log("Services received:", response.data);

        setServices(response.data);
      } catch (error) {
        console.error("Error loading services:", error);
        setServiceError("Unable to load services.");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // Convert Date to YYYY-MM-DD
  const formatDateForBackend = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Convert 12-hour time to HH:MM:SS
  const formatTimeForBackend = (time) => {
    const [timePart, period] = time.split(" ");

    let [hours, minutes] = timePart.split(":");

    hours = parseInt(hours);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${minutes}:00`;
  };

  // Book the service
  const handleBooking = async () => {
    setBookingMessage("");
    setBookingError("");

    if (!selectedService) {
      setBookingError("Please select a service.");
      return;
    }

    if (!selectedDate) {
      setBookingError("Please select a date.");
      return;
    }

    if (!selectedTime) {
      setBookingError("Please select a time slot.");
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      setBookingError("Please login first.");
      return;
    }

    const bookingData = {
      service: Number(selectedService),
      booking_date: formatDateForBackend(selectedDate),
      booking_time: formatTimeForBackend(selectedTime),
    };

    console.log("Booking data:", bookingData);

    setBookingLoading(true);

    try {
      const response = await axios.post(
    "https://consultancy-management-system-2.onrender.com/api/bookings/bookings/create",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking successful:", response.data);

      setBookingMessage("Service booked successfully!");

      // Clear selected service and time
      setSelectedService("");
      setSelectedTime("");
    } catch (error) {
      console.error("Booking error:", error);

      console.log("Backend error:", error.response?.data);

      setBookingError(
        error.response?.data?.detail ||
          "Unable to book the service. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar
          title="Booking"
          username={loadingProfile ? "Loading..." : user.name}
        />

        <div className="booking-container">

          {/* LEFT SIDE */}
          <div className="booking-left">

            {/* BOOKING CARD */}
            <div className="booking-card">
              <h3>Book a New Service</h3>

              <div className="booking-form">

                {/* STEP 1 */}
                <div className="booking-row">
                  <label>Step 1: Select Service</label>

                  <select
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      setBookingError("");
                      setBookingMessage("");
                    }}
                  >
                    <option value="">
                      {loadingServices
                        ? "Loading services..."
                        : "Select a service"}
                    </option>

                    {!loadingServices &&
                      services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                  </select>
                </div>

                {serviceError && (
                  <p className="error-message">{serviceError}</p>
                )}

                {!loadingServices &&
                  !serviceError &&
                  services.length === 0 && (
                    <p className="error-message">
                      No services are available yet.
                    </p>
                  )}

                {/* STEP 2 */}
                <div className="booking-row">
                  <label>Step 2: Date and Time</label>

                  <input
                    type="text"
                    className="calendar-input"
                    value={
                      selectedDate
                        ? selectedDate.toLocaleDateString()
                        : ""
                    }
                    readOnly
                  />
                </div>

                {/* STEP 3 */}
                <div className="booking-row">
                  <label>Step 3: Selected Time</label>

                  <input
                    type="text"
                    className="calendar-input"
                    value={selectedTime || "Select a time slot"}
                    readOnly
                  />
                </div>

                {/* BOOKING MESSAGE */}
                {bookingMessage && (
                  <p className="success-message">
                    {bookingMessage}
                  </p>
                )}

                {bookingError && (
                  <p className="error-message">
                    {bookingError}
                  </p>
                )}

                {/* BOOK BUTTON */}
                <button
                  type="button"
                  className="continue-btn"
                  onClick={handleBooking}
                  disabled={bookingLoading}
                >
                  {bookingLoading
                    ? "Booking..."
                    : "Book a Service"}
                </button>
              </div>
            </div>

            {/* CALENDAR CARD */}
            <div className="calendar-card">
              <h3>Select Preferred Date</h3>

              <Calendar
                onChange={(date) => {
                  setSelectedDate(date);
                  setBookingError("");
                  setBookingMessage("");
                }}
                value={selectedDate}
                minDate={new Date()}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="booking-right">

            {/* PERSONAL DETAILS */}
            <div className="details-card">
              <h3>Personal Details</h3>

              {profileError && (
                <p className="error-message">{profileError}</p>
              )}

              <div className="detail">
                <label>Full Name</label>

                <input
                  type="text"
                  value={user.name}
                  placeholder={
                    loadingProfile ? "Loading..." : ""
                  }
                  readOnly
                />
              </div>

              <div className="detail">
                <label>Email</label>

                <input
                  type="email"
                  value={user.email}
                  placeholder={
                    loadingProfile ? "Loading..." : ""
                  }
                  readOnly
                />
              </div>
            </div>

            {/* AVAILABLE TIME SLOTS */}
            <div className="slot-card">
              <h3>Available Time Slot</h3>

              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
                  className={
                    selectedTime === time
                      ? "slot active-slot"
                      : "slot"
                  }
                  onClick={() => {
                    setSelectedTime(time);
                    setBookingError("");
                    setBookingMessage("");
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
