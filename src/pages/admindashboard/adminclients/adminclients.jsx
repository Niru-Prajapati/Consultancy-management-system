import { useEffect, useState } from "react";
import "./adminclients.css";
import {
  FaUser,
  FaEnvelope,
  FaEye,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected client for View
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const token = localStorage.getItem("admin_access_token");

    if (!token) {
      setError("Admin login required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://consultancy-management-system-2.onrender.com/api/accounts/admin/clients/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }

      const data = await response.json();

      console.log("Admin clients:", data);

      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError("Unable to load clients.");
    } finally {
      setLoading(false);
    }
  };

  // Open client details
  const viewClient = (client) => {
    setSelectedClient(client);
  };

  // Close client details
  const closeClient = () => {
    setSelectedClient(null);
  };

  // Search + status filter
  const filteredClients = clients.filter((client) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      client.name?.toLowerCase().includes(searchText) ||
      client.email?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      client.status?.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Summary counts
  const totalClients = clients.length;

  const activeClients = clients.filter(
    (client) => client.status?.toLowerCase() === "active"
  ).length;

  const inactiveClients = clients.filter(
    (client) => client.status?.toLowerCase() === "inactive"
  ).length;

  return (
    <div className="admin-clients">
      <div className="clients-header">
        <div>
          <h1>Clients</h1>
          <p>Manage registered clients and their information</p>
        </div>

        <button className="add-client-btn">
          + Add Client
        </button>
      </div>

      {/* Summary Cards */}
      <div className="client-summary">
        <div className="client-summary-card">
          <div className="client-summary-icon">
            <FaUser />
          </div>

          <div>
            <h3>{totalClients}</h3>
            <p>Total Clients</p>
          </div>
        </div>

        <div className="client-summary-card">
          <div className="client-summary-icon">
            <FaUser />
          </div>

          <div>
            <h3>{activeClients}</h3>
            <p>Active Clients</p>
          </div>
        </div>

        <div className="client-summary-card">
          <div className="client-summary-icon">
            <FaUser />
          </div>

          <div>
            <h3>{inactiveClients}</h3>
            <p>Inactive Clients</p>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="clients-container">
        <div className="clients-top">
          <h2>Client List</h2>

          <div className="client-filters">
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && <p>Loading clients...</p>}

        {/* Error */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="clients-table-wrapper">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <div className="client-name">
                          <div className="client-avatar">
                            {client.name
                              ? client.name.charAt(0).toUpperCase()
                              : "?"}
                          </div>

                          <span>
                            {client.name || "No name"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="client-contact">
                          <FaEnvelope />
                          {client.email}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`client-status ${client.status?.toLowerCase()}`}
                        >
                          {client.status}
                        </span>
                      </td>

                      <td>
                        <div className="client-actions">
                          {/* View */}
                          <button
                            className="view-client-btn"
                            title="View Client"
                            onClick={() => viewClient(client)}
                          >
                            <FaEye />
                          </button>

                          <button
                            className="delete-client-btn"
                            title="Delete Client"
                            onClick={() => deleteClient(client.id)}
                          >
  
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      No clients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
      {selectedClient && (
        <div className="client-modal-overlay" onClick={closeClient}>
          <div
            className="client-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="client-modal-header">
              <h2>Client Details</h2>

              <button
                className="close-modal-btn"
                onClick={closeClient}
              >
                <FaTimes />
              </button>
            </div>

            <div className="client-modal-body">
              <div className="modal-client-avatar">
                {selectedClient.name
                  ? selectedClient.name.charAt(0).toUpperCase()
                  : "?"}
              </div>

              <h3>
                {selectedClient.name || "No name"}
              </h3>

              <div className="client-detail">
                <FaEnvelope />
                <div>
                  <span>Email</span>
                  <p>{selectedClient.email}</p>
                </div>
              </div>

              <div className="client-detail">
                <FaUser />
                <div>
                  <span>Status</span>
                  <p>
                    <span
                      className={`client-status ${selectedClient.status?.toLowerCase()}`}
                    >
                      {selectedClient.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="client-detail">
                <FaUser />
                <div>
                  <span>Client ID</span>
                  <p>{selectedClient.id}</p>
                </div>
              </div>
            </div>

            <div className="client-modal-footer">
              <button onClick={closeClient}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const deleteClient = async (clientId) => {
  const token = localStorage.getItem("admin_access_token");

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this client?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `https://consultancy-management-system-2.onrender.com/api/accounts/admin/clients/${clientId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete client");
    }

    // Remove the deleted client from the table
    setClients((previousClients) =>
      previousClients.filter((client) => client.id !== clientId)
    );

    alert("Client deleted successfully.");
  } catch (error) {
    console.error("Error deleting client:", error);
    alert("Unable to delete client.");
  }
};

export default AdminClients;
