import React from "react";
import { CiSearch } from "react-icons/ci";
const SearchBar = ({value, handleChange}) => {
  return (
    <div className="relative">
      <span className="absolute top-2 left-2">
        <CiSearch size={22} />
      </span>
      <input
        type="text"
        className="input-base font-lexend px-10"
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
