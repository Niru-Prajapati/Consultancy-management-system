import "./signup.css";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthButton from "../../components/AuthButton";
import GoogleButton from "../../components/GoogleButton";
import InputField from "../../components/InputField";
import PasswordField from "../../components/PasswordField";
function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
  const newErrors = {};

  if (!name.trim()) {
    newErrors.name = "Full name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(email)) {
    newErrors.email = "Please enter a valid email";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
  }

  if (!confirmPassword.trim()) {
    newErrors.confirmPassword = "Confirm password is required";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length !== 0) {
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/accounts/signup/",
      {
        full_name: name,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }
    );

    console.log("Signup successful:", response.data);

    // Go to login after successful signup
    navigate("/login");

  } catch (error) {
    console.error("Signup error:", error);

    if (error.response?.data) {
      const backendErrors = error.response.data;

      // Handle email already exists / other backend validation
      if (backendErrors.non_field_errors) {
        setErrors({
          general: backendErrors.non_field_errors[0],
        });
      } else if (backendErrors.email) {
        setErrors({
          email: backendErrors.email[0],
        });
      } else {
        setErrors({
          general: "Unable to create account.",
        });
      }
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
    <div className="signup-container">
      <div className="signup-card">

        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>

        <h1 className="signup-title">Sign Up</h1>

        <p className="signup-subtitle">
          Create your account
        </p>

        <div className="form-box">

         <InputField
            label="Full Name"
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({
                ...prev,
                name: "",
                }));
            }}
            error={errors.name}
            />

        <InputField
        label="Email"
        type="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({
            ...prev,
            email: "",
            }));
        }}
        error={errors.email}
        />

          <PasswordField
            label="Password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({
                ...prev,
                password: "",
                }));
            }}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            error={errors.password}
            />

         <PasswordField
            label="Confirm Password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({
                ...prev,
                confirmPassword: "",
                }));
            }}
            showPassword={showConfirmPassword}
            togglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
            }
            error={errors.confirmPassword}
            />
            {errors.general && (
  <p className="error-message">{errors.general}</p>
)}
          <AuthButton
            text="Sign Up"
            loadingText="Signing up..."
            loading={loading}
            onClick={handleSignup}
            className="signup-btn"
          />
             <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
        </div>

       

      </div>
    </div>
  );
}

export default Signup;