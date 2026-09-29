import { useEffect, useState } from "react";
import "./recentapplications.css";

function RecentApplications() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [consultants, setConsultants] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("admin_access_token");

    if (!token) {
      setError("Admin login required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://consultancy-management-system-2.onrender.com/api/bookings/bookings/",
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

      console.log("Admin bookings:", data);

      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  // Approve booking
  const approveBooking = async (bookingId) => {
    const token = localStorage.getItem("admin_access_token");

    try {
      const response = await fetch(
        `https://consultancy-management-system-2.onrender.com/api/bookings/bookings/${bookingId}/status/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "scheduled",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to approve booking");
      }

      console.log("Booking approved:", data);

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: "scheduled",
              }
            : booking
        )
      );
    } catch (error) {
      console.error("Error approving booking:", error);
      alert("Unable to approve booking.");
    }
  };

  // Assign consultant
  const assignConsultant = async (bookingId) => {
    const token = localStorage.getItem("admin_access_token");
    const providerName = consultants[bookingId]?.trim();

    if (!providerName) {
      alert("Please enter consultant name.");
      return;
    }

    try {
      const response = await fetch(
        `https://consultancy-management-system-2.onrender.com/api/bookings/bookings/${bookingId}/assign/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider_name: providerName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to assign consultant"
        );
      }

      console.log("Consultant assigned:", data);

      // Update the booking on screen
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                provider_name: providerName,
              }
            : booking
        )
      );

      // Clear input
      setConsultants((previous) => ({
        ...previous,
        [bookingId]: "",
      }));
    } catch (error) {
      console.error("Error assigning consultant:", error);
      alert("Unable to assign consultant.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusText = (status) => {
    switch (status) {
      case "new":
        return "New";

      case "contacted":
        return "Contacted";

      case "scheduled":
        return "Scheduled";

      case "completed":
        return "Completed";

      default:
        return status;
    }
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Recent Bookings</h3>
        <button>View All</button>
      </div>

      {loading && <p>Loading bookings...</p>}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>

                  <td>{booking.client}</td>

                  <td>
                    {booking.service || "Not selected"}
                  </td>

                  <td>
                    {formatDate(booking.booking_date)}
                  </td>

                  <td>
                    {booking.booking_time || "Not set"}
                  </td>

                  <td>
                    {booking.provider_name ? (
                      booking.provider_name
                    ) : booking.status === "scheduled" ? (
                      <div className="consultant-box">
                        <input
                          type="text"
                          placeholder="Consultant name"
                          value={consultants[booking.id] || ""}
                          onChange={(e) =>
                            setConsultants((previous) => ({
                              ...previous,
                              [booking.id]: e.target.value,
                            }))
                          }
                        />

                        <button
                          className="assign-btn"
                          onClick={() =>
                            assignConsultant(booking.id)
                          }
                        >
                          Assign
                        </button>
                      </div>
                    ) : (
                      "Not assigned"
                    )}
                  </td>

                  <td>
                    <span
                      className={`status ${booking.status}`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </td>

                  <td>
                    {booking.status === "new" ? (
                      <button
                        className="view-btn"
                        onClick={() =>
                          approveBooking(booking.id)
                        }
                      >
                        Approve
                      </button>
                    ) : booking.status === "scheduled" ? (
                      booking.provider_name
                        ? "Assigned"
                        : "Assign"
                    ) : (
                      "-"
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center" }}
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentApplications;
