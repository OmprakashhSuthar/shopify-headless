import { Link } from "react-router-dom";
import "./FlyoutMenu.css";
import Links from "./Links";

export default function FlyoutMenu({ items }) {
  return (
    <div className="flyout-menu">
      <div className="flyout-columns">
        {items.map((column) => (
          <div key={column.id} className="flyout-column">
            <h4 className="flyout-heading">{column.title}</h4>
            {column.items.map((subItem) => (
              <Links items={subItem} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
