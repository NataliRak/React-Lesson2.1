import React, { useEffect, useState } from "react";

import Pagination from "../components/pagination";
import SearchStatus from "../components/searchStatus";
import GroupList from "../components/groupList";
import UsersTable from "../components/usersTable";
import Preloader from "../components/preloader";
import SearchInput from "./SearchInput";

import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import _ from "lodash";

function Users() {
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [professionslSelect, setProfessionslSelect] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    api.users.fetchAll().then((data) =>
      setUsers(
        data.map((user) => {
          return { ...user, isBookmark: false };
        })
      )
    );
  }, []);

  // delete
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  // bookmark
  const handleToggleBookmark = (userId) => {
    const updatedBookmark = users.map((user) => {
      if (user._id === userId) {
        user.isBookmark = !user.isBookmark;
      }
      return user;
    });
    setUsers(updatedBookmark);
  };

  // bange
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

  // pagination
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionslSelect = (item) => {
    setSearchValue("");
    setProfessionslSelect(item);
  };

  // sort method
  const handleSort = (item) => {
    setSortBy(item);
  };
  //  search input
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  if (users) {
    //  search input
    const getSearchedUsers = () => {
      const searchedUsers = users.filter((user) => user.name.toLowerCase().includes(searchValue));
      return searchedUsers;
    };

    const searchedUsers = getSearchedUsers();

    // filter
    const filteredUsers = professionslSelect
      ? users.filter((user) => user.profession._id === professionslSelect._id)
      : users;

    const count = filteredUsers.length;

    // sort
    const sortUsers = _.orderBy(
      searchValue ? searchedUsers : filteredUsers,
      [sortBy.path],
      [sortBy.order]
    );
    const userCrop = paginate(sortUsers, currentPage, pageSize);

    // cleareFilter
    const cleareFilter = () => {
      setProfessionslSelect();
    };

    return (
      <>
        {" "}
        <div className="d-flex ">
          <div className="d-flex m-3 p-2 bg-dark p-2 text-white  rounded ">
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

          <div className="d-flex flex-column p-2 flex-grow-1 ">
            <SearchInput search={handleSearchValue} value={searchValue} />
            {count === 0 ? (
              <div className="">
                <SearchStatus phrase={renderPhrase} length={count} />
              </div>
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
  return <Preloader />;
}

Users.propTypes = {
  users: PropTypes.array,
  renderPhrase: PropTypes.func
};

export default Users;
