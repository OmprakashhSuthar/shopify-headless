import React, { useContext } from "react";
import { FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";
import Search from "./Search";
import { IsMobileCtx } from "./context/IsMobileContext";

export default function HeaderActions({ toggleDrawer }) {
  const isMobile = useContext(IsMobileCtx);
  return (
    <>
      {!isMobile && <Search />}
      <div className="header-actions">
        <a href="/account" className="header-icon" aria-label="Account">
          <FiUser />
        </a>
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
