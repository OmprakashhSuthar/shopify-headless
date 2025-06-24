import { useContext } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IsMobileCtx } from "./context/IsMobileContext";

export default function Links({ items, toggleSection, expandedKey }) {
  const url = items.url.includes("myshopify.com");
  const linkUrl = url ? new URL(items.url).pathname : items.url;
  const isMobile = useContext(IsMobileCtx);

  return (
    <div className="links-container">
      <Link to={linkUrl} className="menu-link">
        {items.title}
      </Link>
      {isMobile &&
        toggleSection &&
        (expandedKey ? (
          <FiMinus onClick={toggleSection} />
        ) : (
          <FiPlus onClick={toggleSection} />
        ))}
    </div>
  );
}
