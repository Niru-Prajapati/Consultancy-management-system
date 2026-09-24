import { useEffect, useState } from "react";
import "./adminsettings.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBell,
  FaSave,
} from "react-icons/fa";

function AdminSettings() {
  const [fullName, setFullName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [phone, setPhone] = useState("");

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notifications, setNotifications] = useState({
    appointment: true,
    registration: true,
    application: false,
  });

  useEffect(() => {
    fetchProfile();

    const savedNotifications = localStorage.getItem(
      "admin_notifications"
    );

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("admin_access_token");

      if (!token) return;

      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/profile/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Could not load admin profile");
        return;
      }

      const data = await response.json();

      setFullName(
        data.full_name ||
        data.name ||
        data.username ||
        "Admin"
      );

      setEmail(data.email || "admin@gmail.com");

      if (data.phone) {
        setPhone(data.phone);
      }
    } catch (error) {
      console.error("Profile error:", error);
    }
  };

  const handleProfileSave = () => {
    /*
      Your current backend does not provide a profile-update
      endpoint, so we don't send a fake API request here.
    */

    localStorage.setItem("admin_name", fullName);
    localStorage.setItem("admin_email", email);
    localStorage.setItem("admin_phone", phone);

    setProfileMessage("Profile information saved.");

    setTimeout(() => {
      setProfileMessage("");
    }, 3000);
  };

  const handlePasswordUpdate = () => {
    setPasswordMessage("");

    if (!newPassword || !confirmPassword) {
      setPasswordMessage("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    /*
      Password change requires a backend endpoint.
      We don't fake the update on the frontend.
    */

    setPasswordMessage(
      "Password change API is not connected yet."
    );
  };

  const handleNotificationChange = (type) => {
    const updatedNotifications = {
      ...notifications,
      [type]: !notifications[type],
    };

    setNotifications(updatedNotifications);

    localStorage.setItem(
      "admin_notifications",
      JSON.stringify(updatedNotifications)
    );
  };

  return (
    <div className="admin-settings">

      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your admin account and system preferences
          </p>
        </div>
      </div>

      <div className="settings-content">

        {/* Profile Settings */}
        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              <FaUser />
            </div>

            <div>
              <h2>Profile Information</h2>
              <p>Update your personal information</p>
            </div>

          </div>

          <div className="settings-form">

            <div className="form-group">
              <label>Full Name</label>

              <div className="input-with-icon">
                <FaUser />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-with-icon">
                <FaEnvelope />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <div className="input-with-icon">
                <FaUser />

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

          </div>

          <div className="settings-actions">

            <button
              className="save-btn"
              onClick={handleProfileSave}
            >
              <FaSave />
              Save Changes
            </button>

          </div>

          {profileMessage && (
            <p className="settings-success">
              {profileMessage}
            </p>
          )}

        </div>

        {/* Password Settings */}
        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              <FaLock />
            </div>

            <div>
              <h2>Change Password</h2>
              <p>Update your account password</p>
            </div>

          </div>

          <div className="settings-form">

            <div className="form-group">
              <label>Current Password</label>

              <div className="input-with-icon">
                <FaLock />

                <input
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>

              <div className="input-with-icon">
                <FaLock />

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>

              <div className="input-with-icon">
                <FaLock />

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </div>
            </div>

          </div>

          <div className="settings-actions">

            <button
              className="save-btn"
              onClick={handlePasswordUpdate}
            >
              <FaSave />
              Update Password
            </button>

          </div>

          {passwordMessage && (
            <p className="settings-message">
              {passwordMessage}
            </p>
          )}

        </div>

        {/* Notification Settings */}
        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              <FaBell />
            </div>

            <div>
              <h2>Notifications</h2>
              <p>Manage your notification preferences</p>
            </div>

          </div>

          <div className="notification-options">

            <div className="notification-option">

              <div>
                <h3>New Appointment</h3>
                <p>
                  Receive notifications when a client books an
                  appointment.
                </p>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications.appointment}
                  onChange={() =>
                    handleNotificationChange("appointment")
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

            <div className="notification-option">

              <div>
                <h3>New Client Registration</h3>
                <p>
                  Receive notifications when a new client
                  registers.
                </p>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications.registration}
                  onChange={() =>
                    handleNotificationChange("registration")
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

            <div className="notification-option">

              <div>
                <h3>Application Updates</h3>
                <p>
                  Receive notifications about client application
                  updates.
                </p>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications.application}
                  onChange={() =>
                    handleNotificationChange("application")
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminSettings;

