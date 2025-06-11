/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import RenderMenuItems from "./MenuItems";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import "./Header.css";

const API_URL = "http://localhost:8080/shopify/menu";

export default function Header() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch(API_URL);
        const menus = await res.json();
        setMenuItems(menus);
      } catch (error) {
        console.log("Failed to fetch Menu: ", error);
      }
    };
    fetchMenuItems();
  }, []);

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
          </div>
        </div>
        <nav>
          {menuItems.length === 0 ? (
            <p>Loading menu...</p>
          ) : (
            <RenderMenuItems items={menuItems} />
          )}
        </nav>
      </div>
    </>
  );
}
