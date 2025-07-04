import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import apiFunctions from "../util/http";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiFunctions.fetchCustomerData(
        formData.email,
        formData.password
      );


      if (response?.data?.customer?.id) {
        localStorage.setItem(
          "customer",
          JSON.stringify(response.data.customer)
        );
        navigate("/account");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/account/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
