import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./quality";
import PropTypes from "prop-types";

function User({ user, onDelete, onToggleBookmark }) {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Qualitie key={quality._id} name={quality.name} color={quality.color} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <BookMark onToggleBookmark={onToggleBookmark} user={user} />
      </td>
      <td>
        <button className="btn rounded-pill btn-danger btn-sm" onClick={() => onDelete(user._id)}>
          delete
        </button>
      </td>
    </tr>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};

export default User;
