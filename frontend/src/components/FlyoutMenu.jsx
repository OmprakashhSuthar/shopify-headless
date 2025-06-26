import { FiPlus, FiMinus } from "react-icons/fi";
import Links from "./Links";
import "./FlyoutMenu.css";
import useExpandedSection from "../hooks/expandedHook";
import { useContext } from "react";
import { IsMobileCtx } from "./context/IsMobileContext";

export default function FlyoutMenu({ items, setIsDrawerOpen }) {
  const { expanded, toggleSection } = useExpandedSection();
  const isMobile = useContext(IsMobileCtx);

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
                <Links
                  key={subItem.id}
                  items={subItem}
                  setIsDrawerOpen={setIsDrawerOpen}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
