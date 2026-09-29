import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./adminlogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://consultancy-management-system-2.onrender.com/api/accounts/admin-login/",
        {
          username: username,
          password: password,
        }
      );

      console.log("Admin login successful:", response.data);

      // Store admin tokens separately
      localStorage.setItem("admin_access_token", response.data.access);
      localStorage.setItem("admin_refresh_token", response.data.refresh);

      // Store admin username
      localStorage.setItem("admin_username", response.data.username);

      // Go to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      console.log("Backend error:", error.response?.data);

      if (error.response?.status === 401) {
        setErrors({
          general: "Wrong username or password.",
        });
      } else if (error.response?.status === 403) {
        setErrors({
          general: "You are not an admin.",
        });
      } else {
        setErrors({
          general: "Unable to connect to the server.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">

        <div className="admin-login-header">
          <h2>Admin Login</h2>
          <p>Login to access the administration panel</p>
        </div>

        <div className="admin-login-form">

          <div className="admin-input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({});
              }}
            />

            {errors.username && (
              <p className="admin-error">{errors.username}</p>
            )}
          </div>

          <div className="admin-input-group">
            <label>Password</label>

            <div className="admin-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({});
                }}
              />

              <button
                type="button"
                className="admin-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="admin-error">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="admin-general-error">
              {errors.general}
            </p>
          )}

          <button
            type="button"
            className="admin-login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
