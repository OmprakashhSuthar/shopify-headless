import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Links({ items, isMobile, toggleSection, expandedKey }) {
  const url = items.url.includes("myshopify.com");
  const linkUrl = url ? new URL(items.url).pathname : items.url;

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
