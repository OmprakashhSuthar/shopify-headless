import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Links({ items, isMobile, toggleSection, expandedKey }) {
  return (
    <>
      {items.type === "COLLECTION" ? (
        <div className="links-container">
          <Link
            to={
              items.url.includes("myshopify.com")
                ? new URL(items.url).pathname
                : items.url
            }
            className="menu-link"
          >
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
      ) : (
        <div className="links-container">
          <Link
            to={
              items.url.includes("myshopify.com")
                ? new URL(items.url).pathname
                : items.url
            }
            className="menu-link"
          >
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
      )}
    </>
  );
}
