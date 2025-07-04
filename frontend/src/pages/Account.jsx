import React, { useEffect, useState } from "react";
import "./Account.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Account() {
  const [customer, setCustomer] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("customer");
    if (stored) {
      setCustomer(JSON.parse(stored));
    } else {
      if (location.pathname === "/account") {
        navigate("/account/login");
      }
    }
  }, [location.pathname, navigate]);

  const isAuthRoute =
    location.pathname === "/account/login" ||
    location.pathname === "/account/signup";

  if (isAuthRoute) {
    return <Outlet />;
  }

  if (!customer) return null;

  return (
    <div className="account-container">
      <div className="account-box">
        <h2 className="account-title">Welcome, {customer.firstName} 👋</h2>

        <div className="account-info">
          <div className="info-row">
            <span className="info-label">Full Name:</span>
            <span className="info-value">
              {customer.firstName} {customer.lastName}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{customer.email}</span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("customer");
            navigate("/account/login");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
