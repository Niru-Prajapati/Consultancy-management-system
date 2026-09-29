import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/navbar/navbar";
import "./setting.css";
import { useEffect, useState } from "react";

function Settings() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    country: "Nepal",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

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
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      setUser({
        fullName: data.full_name || "",
        email: data.email || "",
        country: "Nepal",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setSaving(true);
    // Profile update API will be connected here
    // once the backend update endpoint is added.

    setTimeout(() => {
      setSaving(false);
      alert("Profile settings saved.");
    }, 500);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">
          <Navbar title="Settings" username="" />

          <div className="settings-container">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar
          title="Settings"
          username={user.fullName}
        />

        <div className="settings-container">
          {error && (
            <p className="settings-error">
              {error}
            </p>
          )}

          <div className="settings-card">
            <h2>Profile Settings</h2>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Country</label>

              <input
                type="text"
                name="country"
                value={user.country}
                onChange={handleChange}
              />
            </div>

            <button
              className="save-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
