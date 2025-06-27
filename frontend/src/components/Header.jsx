/* eslint-disable array-callback-return */
import { useContext, useState } from "react";
import RenderMenuItems from "./MenuItems";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import "./Header.css";
import { useQuery } from "@tanstack/react-query";
import apiFunctions from "../util/http";
import { IsMobileCtx } from "./context/IsMobileContext";
import Search from "./Search";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useContext(IsMobileCtx);
  const {
    data: menuItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: apiFunctions.fetchMenuItems,
  });

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (isError) {
    return <p>Error occured while loading the menu.</p>;
  }

  const toggleDrawer = (e) => {
    e.preventDefault();
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <div className="site-header">
        <div className="header-container">
          <div className="header-logo">
            <a href="/">
              Shopify<span>Store</span>
            </a>
          </div>

          <div className="header-actions">
            <Search />
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
        </div>
        <nav>
          {isMobile ? (
            <>
              <div
                className={`setBackground ${isDrawerOpen ? "open" : ""}`}
                onClick={() => setIsDrawerOpen(false)}
              />
              <div
                className={`mobile-navigation ${isDrawerOpen ? "open" : ""}`}
              >
                <div className="menu-logo">
                  <div className="nav-heading">
                    <h2>Menu</h2>
                    <FiX
                      className="close-button"
                      onClick={() => setIsDrawerOpen(false)}
                    />
                  </div>
                  <div className="underline-menu"></div>
                </div>
                <RenderMenuItems
                  items={menuItems}
                  setIsDrawerOpen={() => setIsDrawerOpen(false)}
                />
              </div>
            </>
          ) : (
            <RenderMenuItems items={menuItems} />
          )}
        </nav>
      </div>
    </>
  );
}
