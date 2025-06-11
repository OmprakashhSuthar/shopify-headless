import "./FlyoutMenu.css";

export default function FlyoutMenu({ items }) {
  return (
    <div className="flyout-menu">
      <div className="flyout-columns">
        {items.map((column) => (
          <div key={column.id} className="flyout-column">
            <h4 className="flyout-heading">{column.title}</h4>
            {Array.isArray(column.items) &&
              column.items.map((subItem) => (
                <a key={subItem.id} href={subItem.url} className="flyout-link">
                  {subItem.title}
                </a>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
