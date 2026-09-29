import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../assets/images/logo.png";
import axios from "axios";


import { useState } from "react";
import AuthButton from "../../components/AuthButton";
import GoogleButton from "../../components/GoogleButton";
import InputField from "../../components/InputField";
import PasswordField from "../../components/PasswordField";
function Login(){
    
    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    
    const [password,setPassword]=useState("");
    const [showPassword, setShowPassword]=useState(false);
    const [errors,setErrors]=useState({});
    const [loading,setLoading]=useState(false);

    const validateEmail=(email)=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
   const handleLogin = async () => {
    const newErrors = {};

    if (!email.trim()) {
        newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
        newErrors.email = "Please enter a valid email address";
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
            "https://consultancy-management-system-2.onrender.com/api/accounts/login/",
            {
                email: email,
                password: password,
            }
        );

        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        console.log("Login successful");

        navigate("/client/dashboard");

    } catch (error) {
        if (error.response?.status === 401) {
            setErrors({
                general: "Invalid email or password."
            });
        } else {
            setErrors({
                general: "Unable to connect to the server."
            });
        }
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo">
                    <img src={logo} alt="Company Logo" />
                </div>
                <h1 className="login-title">Login</h1>

        <p className="login-subtitle">
          Login to your account
        </p>
        <div className="form-box">

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
        {errors.general && (
    <p className="error-message">{errors.general}</p>
)}
        <AuthButton
            text="Login"
            loadingText="Logging in..."
            loading={loading}
            onClick={handleLogin}
            className="login-btn"
        />

       
        <p className="signup-text">
          Don't have an account?{""}
          <Link to="/signup" className="signup-link">
          Sign Up</Link>
          
        </p>

        </div>


        

      </div>
    </div>
  );
}

export default Login;
