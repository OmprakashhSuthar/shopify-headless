import FlyoutMenu from "./FlyoutMenu";
import "./MenuItems.css";
import Links from "./Links";
import { useState } from "react";

export default function RenderMenuItems({ items, isMobile }) {
  const [expanded, setExpanded] = useState({});

  const toggleSection = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ul className="menu">
      {items.map((item, index) => (
        <li key={item.id}>
          <Links
            toggleSection={() => toggleSection(index)}
            expandedKey={expanded[index]}
            items={item}
            isMobile={isMobile}
          />
          {item.items.length > 0 && (expanded[index] || !isMobile) && (
            <div className="floyout-wrapper">
              <FlyoutMenu items={item.items} isMobile={isMobile} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
