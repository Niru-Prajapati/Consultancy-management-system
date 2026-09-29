import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./clientdashboard.css";
import SummaryCards from "../../components/summarycards/summarycards";
import UpcomingBookings from "../../components/upcomingbookings/upcomingbookings";

function ClientDashboard() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          "https://consultancy-management-system-2.onrender.com/api/accounts/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();

        setUser({
          name: data.full_name,
          email: data.email,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No access token found");
        return;
      }

      try {
        const response = await fetch(
          "https://consultancy-management-system-2.onrender.com/api/bookings/my-bookings/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        console.log("My bookings:", data);

        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar
          title="Dashboard"
          username={user.name}
        />

        <div className="dashboard-body">
          <h2>Welcome back, {user.name} 👋</h2>

          <p>
            Manage your applications, appointments, and consultancy services
            from one place.
          </p>

          <SummaryCards bookings={bookings} />

          <div className="dashboard-grid">
            <UpcomingBookings bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
