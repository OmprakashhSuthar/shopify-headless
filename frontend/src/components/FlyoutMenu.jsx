import { FiPlus, FiMinus } from "react-icons/fi";
import Links from "./Links";
import "./FlyoutMenu.css";
import useExpandedSection from "../hooks/expandedHook";

export default function FlyoutMenu({ items, isMobile }) {
  const { expanded, toggleSection } = useExpandedSection();

  return (
    <div className="flyout-menu">
      <div className="flyout-columns">
        {items.map((column, index) => (
          <div key={column.id} className="flyout-column">
            <h4 className="flyout-heading">
              {column.title}
              {isMobile &&
                (expanded[index] ? (
                  <FiMinus onClick={() => toggleSection(index)} />
                ) : (
                  <FiPlus onClick={() => toggleSection(index)} />
                ))}
            </h4>

            {(expanded[index] || !isMobile) &&
              column.items.map((subItem) => (
                <Links key={subItem.id} items={subItem} isMobile={isMobile} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
