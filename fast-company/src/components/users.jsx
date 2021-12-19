import React, { useEffect, useState } from "react";

import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";

function Users({ users, renderPhrase, ...props }) {
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [professionslSelect, setProfessionslSelect] = useState();

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionslSelect = (item) => {
    setProfessionslSelect(item);
  };

  const cleareFilter = () => {
    setProfessionslSelect();
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [professionslSelect]);

  const filteredUsers = professionslSelect
    ? users.filter((user) => user.profession._id === professionslSelect._id)
    : users;
  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

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
              <table className="table table-dark table-hover ">
                <thead>
                  <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {userCrop.map((user) => (
                    <User key={user._id} user={user} {...props} />
                  ))}
                </tbody>
              </table>
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

Users.propTypes = {
  users: PropTypes.array.isRequired,
  renderPhrase: PropTypes.func.isRequired
};

export default Users;
