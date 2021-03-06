import React from "react";
import PropTypes from "prop-types";
import Table from "../common/table/table";
import BookMark from "../common/bookmark";
import Qualities from "./qulities";
import { Link } from "react-router-dom";

const UsersTable = ({ users, onSort, selectedSort, onToggleBookmark, onDelete, ...props }) => {
  const colums = {
    name: {
      path: "name",
      name: "имя",
      component: (user) => <Link to={`users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    isBookmark: {
      path: "isBookmark",
      name: "Избранное",
      component: (user) => <BookMark onToggleBookmark={onToggleBookmark} user={user} />
    },
    delete: {
      component: (user) => (
        <button className="btn rounded-pill btn-danger btn-sm" onClick={() => onDelete(user._id)}>
          delete
        </button>
      )
    }
  };
  return <Table onSort={onSort} selectedSort={selectedSort} colums={colums} data={users} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
