import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import SearchSuggestionLayout from "./SearchSuggestionLayout";
import apiFunctions from "../util/http";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    if (e.relatedTarget && e.relatedTarget.closest(".suggestion-box")) {
      return;
    }
    setIsFocused(false);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 3) {
        try {
          const response = await apiFunctions.fetchSearchSuggestions(query);
          setSuggestions(response.searchSuggestions.data.products.edges || []);
        } catch (error) {
          console.error("Failed to fetch search suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search/${query}`);
    }
    setQuery("");
  };

  function handleClick() {
    setQuery("");
  }

  return (
    <>
      <form onSubmit={handleSearch} className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products"
          className="search-input"
          aria-label="Search"
          onFocus={handleOnFocus}
          onBlur={handleBlur}
        />
        <button type="submit" className="search-button" aria-label="Search">
          <FiSearch />
        </button>
      </form>

      {query.length >= 3 && suggestions.length > 0 && isFocused && (
        <SearchSuggestionLayout
          suggestions={suggestions}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default Search;
