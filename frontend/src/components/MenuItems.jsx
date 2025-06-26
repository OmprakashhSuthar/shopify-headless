import FlyoutMenu from "./FlyoutMenu";
import "./MenuItems.css";
import Links from "./Links";
import useExpandedSection from "../hooks/expandedHook";
import { useContext } from "react";
import { IsMobileCtx } from "./context/IsMobileContext";

export default function RenderMenuItems({ items, setIsDrawerOpen }) {
  const { expanded, toggleSection } = useExpandedSection();
  const isMobile = useContext(IsMobileCtx);

  return (
    <ul className="menu">
      {items.map((item, index) => (
        <li key={item.id}>
          <Links
            toggleSection={() => toggleSection(index)}
            setIsDrawerOpen={setIsDrawerOpen}
            expandedKey={expanded[index]}
            items={item}
          />
          {item.items.length > 0 && (expanded[index] || !isMobile) && (
            <div className="floyout-wrapper">
              <FlyoutMenu items={item.items} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
