import React from "react";
import BookMark from "./bookmark";
import Qualities from "./quality";

function User({ user, onDelete, onToggleBookmark, renderBadgesQalities }) {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <Qualities badges={renderBadgesQalities} qualities={user.qualities} />
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <BookMark onToggleBookmark={onToggleBookmark} user={user} />
      </td>
      <td>
        <button
          className="btn rounded-pill btn-danger btn-sm"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
}

export default User;
