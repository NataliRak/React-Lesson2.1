import React from "react";
import PropTypes from "prop-types";

function SearchStatus({ phrase, length }) {
  const getBageClasses = () => {
    let classes = "badge rounded-pill m-1  w-100 ";
    classes += length === 0 ? "bg-danger" : "bg-primary";
    return classes;
  };
  return (
    <h2>
      <span className={getBageClasses()}>{phrase(length)}</span>
    </h2>
  );
}

SearchStatus.propTypes = {
  phrase: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired
};

export default SearchStatus;
