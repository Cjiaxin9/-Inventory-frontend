import React from "react";
import "../supervisor/category/Category_main.css";
const Search = (props) => {
  return (
    <div className="Search">
      <form className="input">
        <input
          className="inputbox"
          type="text"
          placeholder={props.placeholder}
          onChange={props.handleUserInput}
        ></input>
        <button
          className="buttonSearch"
          type="submit"
          onClick={props.handleSubmit}
        >
          Search
        </button>
        <button
          className="buttonclear"
          type="submit"
          onClick={props.handleClear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Search;
