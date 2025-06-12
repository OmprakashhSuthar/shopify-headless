import FlyoutMenu from "./FlyoutMenu";
import "./MenuItems.css";
import Links from "./Links";

export default function RenderMenuItems({ items }) {
  return (
    <ul className="menu">
      {items.map((item) => (
        <li key={item.id}>
          <Links items={item} />
          {item.items.length > 0 && (
            <div className="floyout-wrapper">
              <FlyoutMenu items={item.items} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
