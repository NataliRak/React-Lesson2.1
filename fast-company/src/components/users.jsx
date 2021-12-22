import React, { useEffect, useState } from "react";

import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import GroupList from "./groupList";
import UsersTable from "./usersTable";

import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import _ from "lodash";

function Users() {
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [professionslSelect, setProfessionslSelect] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) =>
      setUsers(
        data.map((user) => {
          return { ...user, isBookmark: false };
        })
      )
    );
  }, []);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (userId) => {
    const updatedBookmark = users.map((user) => {
      if (user._id === userId) {
        user.isBookmark = !user.isBookmark;
      }
      return user;
    });
    setUsers(updatedBookmark);
  };

  const renderPhrase = (number) => {
    if (number === 2 || number === 3 || number === 4) {
      return number + " " + "человека тусуется с тобой сегодня";
    }

    return number === 0
      ? "никто не тусуется с тобой сегодня"
      : number + " " + "человек тусуется с тобой сегодня";
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [professionslSelect]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionslSelect = (item) => {
    setProfessionslSelect(item);
  };

  // sort method
  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = professionslSelect
      ? users.filter((user) => user.profession._id === professionslSelect._id)
      : users;

    const count = filteredUsers.length;

    const sortUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortUsers, currentPage, pageSize);

    const cleareFilter = () => {
      setProfessionslSelect();
    };

    return (
      <>
        {" "}
        <div className="d-flex justify-content-start">
          <div className="m-3 bg-dark p-2 text-white bg-opacity-70 rounded ">
            {professions && (
              <div className="bg rounded ">
                <GroupList
                  items={professions}
                  onItemSelect={handleProfessionslSelect}
                  selectedItem={professionslSelect}
                />
                <button className="btn rounded-pill btn-warning m-3 " onClick={cleareFilter}>
                  CLEARE
                </button>
              </div>
            )}
          </div>

          <div className=" m-2">
            {count === 0 ? (
              <SearchStatus phrase={renderPhrase} length={count} />
            ) : (
              <div className="">
                <SearchStatus phrase={renderPhrase} length={count} />
                <UsersTable
                  users={userCrop}
                  onSort={handleSort}
                  selectedSort={sortBy}
                  onDelete={handleDelete}
                  onToggleBookmark={handleToggleBookmark}
                />
                <div className="d-flex justify-content-center">
                  <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
  return "loading...";
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  renderPhrase: PropTypes.func.isRequired
};

export default Users;
