import { useEffect, useState } from "react";
import "./applications.css";
import AdminLayout from "../../../layouts/adminlayout";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("admin_access_token");

      const response = await fetch(
        "https://consultancy-management-system-2.onrender.com/api/bookings/bookings/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      setApplications(data);
      setError("");
    } catch (err) {
      console.error("Applications error:", err);
      setError("Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (application) => {
    setSelectedApplication(application);
  };

  const closeModal = () => {
    setSelectedApplication(null);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "new":
        return "Pending";
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

  const getStatusClass = (status) => {
    switch (status) {
      case "new":
        return "pending";
      case "contacted":
        return "contacted";
      case "scheduled":
        return "scheduled";
      case "completed":
        return "completed";
      default:
        return "";
    }
  };

  return (
    <AdminLayout>
      <div className="applications-page">

        <div className="page-header">
          <h2>Applications</h2>
          <p>Manage all consultancy applications.</p>
        </div>

        <div className="applications-card">

          {loading ? (
            <p className="message">Loading applications...</p>
          ) : error ? (
            <p className="message error-message">{error}</p>
          ) : applications.length === 0 ? (
            <p className="message">No applications found.</p>
          ) : (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      APP{String(item.id).padStart(3, "0")}
                    </td>

                    <td>{item.client}</td>

                    <td>{item.service || "—"}</td>

                    <td>{item.booking_date || "—"}</td>

                    <td>{item.booking_time || "—"}</td>

                    <td>
                      <span
                        className={`status ${getStatusClass(item.status)}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleView(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

        {/* View Application Modal */}
        {selectedApplication && (
          <div className="application-modal-overlay">

            <div className="application-modal">

              <div className="modal-header">
                <h3>Application Details</h3>

                <button
                  className="close-btn"
                  onClick={closeModal}
                >
                  
                </button>
              </div>

              <div className="application-details">

                <div className="detail-row">
                  <strong>Application ID</strong>
                  <span>
                    APP{String(selectedApplication.id).padStart(3, "0")}
                  </span>
                </div>

                <div className="detail-row">
                  <strong>Client</strong>
                  <span>{selectedApplication.client}</span>
                </div>

                <div className="detail-row">
                  <strong>Service</strong>
                  <span>{selectedApplication.service || "—"}</span>
                </div>

                <div className="detail-row">
                  <strong>Application Date</strong>
                  <span>{selectedApplication.booking_date || "—"}</span>
                </div>

                <div className="detail-row">
                  <strong>Application Time</strong>
                  <span>{selectedApplication.booking_time || "—"}</span>
                </div>

                <div className="detail-row">
                  <strong>Consultant</strong>
                  <span>
                    {selectedApplication.provider_name || "Not assigned"}
                  </span>
                </div>

                <div className="detail-row">
                  <strong>Status</strong>

                  <span
                    className={`status ${getStatusClass(
                      selectedApplication.status
                    )}`}
                  >
                    {getStatusLabel(selectedApplication.status)}
                  </span>
                </div>

              </div>

              <div className="modal-actions">
                <button
                  className="close-modal-btn"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

export default Applications;

