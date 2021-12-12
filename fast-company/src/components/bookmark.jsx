import React from "react";
import PropTypes from "prop-types";

function BookMark({ onToggleBookmark, user }) {
  const bookMark = (isBookmark) => {
    if (isBookmark === true) {
      return <i className="bi bi-bookmark-fill"></i>;
    }
    return <i className="bi bi-bookmark"></i>;
  };
  return (
    <>
      <button className="btn rounded-pill btn-dark" onClick={() => onToggleBookmark(user._id)}>
        {bookMark(user.isBookmark)}
      </button>
    </>
  );
}

BookMark.propTypes = {
  onToggleBookmark: PropTypes.func.isRequired,
  user: PropTypes.object
};
export default BookMark;
