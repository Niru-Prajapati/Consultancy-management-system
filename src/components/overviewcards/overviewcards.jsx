import { useEffect, useState } from "react";
import "./overviewcards.css";
import {
  FaUsers,
  FaUserPlus,
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";

function OverviewCards() {
  const [analytics, setAnalytics] = useState({
    total_bookings: 0,
    new: 0,
    contacted: 0,
    scheduled: 0,
    completed: 0,
    this_week: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("admin_access_token");

      if (!token) {
        setError("Admin login required.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://consultancy-management-system-2.onrender.com/api/bookings/analytics/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const data = await response.json();

        console.log("Analytics:", data);

        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setError("Unable to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const cards = [
    {
      title: "Total Bookings",
      value: analytics.total_bookings,
      icon: <FaUsers />,
      color: "#2563eb",
    },
    {
      title: "New Bookings",
      value: analytics.new,
      icon: <FaUserPlus />,
      color: "#16a34a",
    },
    {
      title: "Scheduled Appointments",
      value: analytics.scheduled,
      icon: <FaCalendarCheck />,
      color: "#7c3aed",
    },
    {
      title: "This Week",
      value: analytics.this_week,
      icon: <FaClipboardList />,
      color: "#ea580c",
    },
  ];

  return (
    <>
      <div className="overview-header">
        <div>
          <h2>System Overview</h2>
          <p>Overview of platform performance</p>
        </div>

        <button className="filter-btn">
          This Week
        </button>
      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <div className="overview-grid">
        {cards.map((card, index) => (
          <div className="overview-card" key={index}>
            <div
              className="overview-icon"
              style={{ background: card.color }}
            >
              {card.icon}
            </div>

            <div>
              <h3>{loading ? "..." : card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OverviewCards;
