import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ search, value }) => {
  return (
    <input
      className="rounded-pill m-1 p-1"
      type="text"
      name=""
      id=""
      value={value}
      onChange={(e) => search(e)}
      placeholder="  Search..."
    />
  );
};
SearchInput.propTypes = {
  search: PropTypes.func,
  value: PropTypes.string
};
export default SearchInput;
