import { useEffect, useState } from "react";
import "./adminappointment.css";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

function AdminAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
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
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      console.log("Admin appointments:", data);

      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Unable to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
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
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      console.log("Status updated:", data);

      setAppointments((previousAppointments) =>
        previousAppointments.map((appointment) =>
          appointment.id === bookingId
            ? {
                ...appointment,
                status: newStatus,
              }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Unable to update appointment status.");
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

  const formatTime = (time) => {
    if (!time) return "Not set";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
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

  const filteredAppointments =
    statusFilter === "all"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === statusFilter
        );

  const totalAppointments = appointments.length;

  const newAppointments = appointments.filter(
    (appointment) => appointment.status === "new"
  ).length;

  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "scheduled"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  ).length;

  return (
    <div className="admin-appointment">
      <div className="appointment-header">
        <div>
          <h1>Appointments</h1>
          <p>Manage and track client appointments</p>
        </div>

        <button className="add-appointment-btn">
          + Add Appointment
        </button>
      </div>

      <div className="appointment-stats">
        <div className="appointment-stat-card">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h3>{loading ? "..." : totalAppointments}</h3>
            <p>Total Appointments</p>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>

          <div>
            <h3>{loading ? "..." : newAppointments}</h3>
            <p>New</p>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="stat-icon">
            <FaCheck />
          </div>

          <div>
            <h3>{loading ? "..." : scheduledAppointments}</h3>
            <p>Scheduled</p>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="stat-icon">
            <FaTimes />
          </div>

          <div>
            <h3>{loading ? "..." : completedAppointments}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      <div className="appointment-table-container">
        <div className="table-header">
          <h2>Appointment List</h2>

          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading && <p>Loading appointments...</p>}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="appointment-table-wrapper">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        <div className="client-info">
                          <div className="client-icon">
                            <FaUser />
                          </div>

                          <span>{appointment.client}</span>
                        </div>
                      </td>

                      <td>
                        {appointment.service || "Not selected"}
                      </td>

                      <td>
                        {formatDate(appointment.booking_date)}
                      </td>

                      <td>
                        {formatTime(appointment.booking_time)}
                      </td>

                      <td>
                        <span
                          className={`appointment-status ${appointment.status}`}
                        >
                          {getStatusText(appointment.status)}
                        </span>
                      </td>

                      <td>
                        <div className="appointment-actions">
                          {appointment.status === "new" && (
                            <button
                              className="confirm-btn"
                              title="Schedule"
                              onClick={() =>
                                updateStatus(
                                  appointment.id,
                                  "scheduled"
                                )
                              }
                            >
                              <FaCheck />
                            </button>
                          )}

                          {appointment.status === "scheduled" && (
                            <button
                              className="confirm-btn"
                              title="Mark Completed"
                              onClick={() =>
                                updateStatus(
                                  appointment.id,
                                  "completed"
                                )
                              }
                            >
                              <FaCheck />
                            </button>
                          )}

                          {appointment.status !== "completed" && (
                            <button
                              className="cancel-btn"
                              title="Mark Contacted"
                              onClick={() =>
                                updateStatus(
                                  appointment.id,
                                  "contacted"
                                )
                              }
                            >
                              <FaTimes />
                            </button>
                          )}

                          {appointment.status === "completed" && (
                            <span>Completed</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center" }}
                    >
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAppointment;
