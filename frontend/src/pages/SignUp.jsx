import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create your account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="first-name" className="signup-label">
            First Name
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            className="signup-input"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="last-name" className="signup-label">
            Last Name
          </label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            className="signup-input"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="signup-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="signup-label">
            Password
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="signup-input"
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

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/account/login" className="login-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
