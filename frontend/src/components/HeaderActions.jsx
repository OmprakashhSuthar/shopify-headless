import React, { useContext, useEffect, useState } from "react";
import { FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";
import Search from "./Search";
import { IsMobileCtx } from "./context/IsMobileContext";
import { Link } from "react-router-dom";

export default function HeaderActions({ toggleDrawer }) {
  const [redirect, setRedirect] = useState("");
  const isMobile = useContext(IsMobileCtx);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      setRedirect("/account");
    } else {
      setRedirect("/account/login");
    }
  }, []);

  return (
    <>
      {!isMobile && <Search />}
      <div className="header-actions">
        <Link to={redirect} className="header-icon" aria-label="Account">
          <FiUser />
        </Link>
        <a href="/cart" className="header-icon" aria-label="Cart">
          <FiShoppingCart />
        </a>
        {isMobile && (
          <a
            href="/"
            className="header-icon"
            onClick={toggleDrawer}
            area-label="Menu"
          >
            <FiMenu />
          </a>
        )}
      </div>
    </>
  );
}
