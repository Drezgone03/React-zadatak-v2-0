import React, { useState, useCallback } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Debouncing function
  const handleSearch = useCallback(
    debounce((searchValue) => {
      onSearch(searchValue);
    }, 500),
    []
  );

  function handleChange(e) {
    const searchValue = e.target.value;
    setQuery(searchValue);
    handleSearch(searchValue);
  }

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

// Debounce utility function
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
