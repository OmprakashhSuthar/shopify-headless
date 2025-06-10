import { useEffect, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import "./ProductFilters.css";

export default function ProductFilters() {
  const API_URL = "http://localhost:8080/shopify/filters";
  const [filters, setFilters] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch filters");
        const data = await response.json();
        setFilters(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFilters();
  }, []);

  const toggleSection = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!filters)
    return <div className="filters-loading">Loading filters...</div>;
  if (error) return <div className="filters-error">Error: {error}</div>;

  return (
    <div className="filters-container">
      <h2 className="filters-title">Filters</h2>
      {Object.entries(filters).map(([key, filter]) => (
        <div className="filter-section" key={key}>
          <button className="filter-toggle" onClick={() => toggleSection(key)}>
            <span>{filter.label}</span>
            <span>{expanded[key] ? <FiMinus /> : <FiPlus />}</span>
          </button>
          {expanded[key] && (
            <ul className="filter-list">
              {filter.values.map((value) => {
                const isColorFilter = key.toLowerCase().includes("color");

                const colorStyle = {
                  backgroundColor: value.label.toLowerCase(),
                };

                return (
                  <li key={value.id}>
                    <label className="filter-option">
                      <input type="checkbox" />
                      <span>
                        {isColorFilter && (
                          <span className="colorStyle" style={colorStyle} />
                        )}
                        {value.label} ({value.count})
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
