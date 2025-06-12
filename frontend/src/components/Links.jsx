import { Link } from "react-router-dom";

export default function Links({ items }) {
  return (
    <>
      {items.type === "COLLECTION" ? (
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
      ) : (
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
      )}
    </>
  );
}
