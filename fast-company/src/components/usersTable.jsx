import React from "react";
import PropTypes from "prop-types";
import Table from "./table";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";

const UsersTable = ({ users, onSort, selectedSort, onToggleBookmark, onDelete, ...props }) => {
  const colums = {
    name: { path: "name", name: "имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
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
