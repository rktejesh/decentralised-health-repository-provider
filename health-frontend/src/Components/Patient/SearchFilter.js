import React from "react";
import {BiSearchAlt2} from "react-icons/bi"

function SearchFilter() {
  return (
    <>
      <form className="search-form">
        <input
          type="search"
          placeholder="Search By Doctor Name"
          className="search-input"
        />
        <BiSearchAlt2 className="search-icon"/>
      </form>
      <form className="search-form" style={{marginTop:"30px"}}>
        <input
          type="search"
          placeholder="Search By Hospital Name"
          className="search-input"
        />
        <BiSearchAlt2 className="search-icon"/>
      </form>
    </>
  );
}
export default SearchFilter;
