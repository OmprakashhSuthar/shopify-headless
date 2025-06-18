/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import RenderMenuItems from "./MenuItems";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import "./Header.css";
import { useQuery } from "@tanstack/react-query";
import apiFunctions from "../util/http";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const isMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    isMobileView();
    window.addEventListener("resize", isMobileView);

    return () => {
      window.removeEventListener("resize", isMobileView);
    };
  }, []);

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
            <a href="/search" className="header-icon" aria-label="Search">
              <FiSearch />
            </a>
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
                <div className="nav-heading">
                  <h2>Menu</h2>
                  <FiX
                    className="close-button"
                    onClick={() => setIsDrawerOpen(false)}
                  />
                </div>
                <RenderMenuItems items={menuItems} isMobile={isMobile} />
              </div>
            </>
          ) : (
            <RenderMenuItems items={menuItems} isMobile={isMobile} />
          )}
        </nav>
      </div>
    </>
  );
}
