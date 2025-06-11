import { useState } from "react";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import "./ProductFilters.css";

export default function ProductFilters({
  filters,
  filteredValues,
  setFilteredValues,
}) {
  const [expanded, setExpanded] = useState({});

  function handleOnClick(filterType, value) {
    setFilteredValues((prevValues) => {
      const newValues = { ...prevValues };

      if (newValues[filterType]?.includes(value)) {
        newValues[filterType] = newValues[filterType].filter(
          (item) => item !== value
        );
      } else {
        newValues[filterType] = [...(newValues[filterType] || []), value];
      }

      return newValues;
    });
  }

  function handleClearFilters() {
    setFilteredValues({});
  }

  const toggleSection = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!filters)
    return <div className="filters-loading">Loading filters...</div>;

  return (
    <>
      {Object.values(filteredValues).some((arr) => arr.length > 0) ? (
        <div className="filterOptions">
          <FiX className="FiX" onClick={handleClearFilters} />
          {Object.entries(filteredValues).map(([filterType, values]) => (
            <p key={filterType}>{values.join(", ")}</p>
          ))}
        </div>
      ) : null}

      <div className="filters-container">
        <h2 className="filters-title">Filters</h2>
        {Object.entries(filters).map(([key, filter]) => (
          <div className="filter-section" key={key}>
            <button
              className="filter-toggle"
              onClick={() => toggleSection(key)}
            >
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
                        <input
                          type="checkbox"
                          checked={(filteredValues[key] || []).includes(
                            value.label
                          )}
                          onChange={() => handleOnClick(key, value.label)}
                        />
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
    </>
  );
}
