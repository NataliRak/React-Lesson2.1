import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

function Users({ users, renderPhrase, ...props }) {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      {count === 0 ? (
        <SearchStatus phrase={renderPhrase} length={count} />
      ) : (
        <div>
          <SearchStatus phrase={renderPhrase} length={count} />
          <table className="table table-dark table-hover">
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
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  renderPhrase: PropTypes.func.isRequired
};

export default Users;
