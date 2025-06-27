import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/products/${query}`);
    }
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="search-input-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products"
        className="search-input"
        aria-label="Search"
      />
      <button type="submit" className="search-button" aria-label="Search">
        <FiSearch />
      </button>
    </form>
  );
};

export default Search;
