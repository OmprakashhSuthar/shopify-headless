import FlyoutMenu from "./FlyoutMenu";
import "./MenuItems.css";

export default function RenderMenuItems({ items }) {
  return (
    <ul className="menu">
      {items.map((item) => (
        <li key={item.id}>
          <a className="menu-link" href={item.url}>
            {item.title}
          </a>
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
