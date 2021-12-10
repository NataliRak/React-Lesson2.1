import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(
    api.users.fetchAll().map((user) => {
      return { ...user, isBookmark: false };
    })
  );

  const [count, setCount] = useState(users.length);

  const formatCount = () => {
    if (count === 2 || count === 3 || count === 4)
      return count + " " + "человека тусуется с тобой сегодня";
    return count === 0
      ? "никто не тусуется с тобой сегодня"
      : count + " " + "человек тусуется с тобой сегодня";
  };

  const getBageClasses = () => {
    let classes = "badge rounded-pill ";
    classes += count === 0 ? "bg-danger" : "bg-primary";
    return classes;
  };

  const handleDelete = (id) => {
    setCount((prevState) => prevState - 1);
    setUsers((prevState) => prevState.filter((user) => user !== id));
  };

  const renderBadgesQalities = (qualities) => {
    return qualities.map((quality) => (
      <span
        key={quality._id}
        className={`badge rounded-pill bg-${quality.color} m-1 `}
      >
        {quality.name}
      </span>
    ));
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

  const BookMark = (isBookmark) => {
    if (isBookmark === true) {
      return <i className="bi bi-bookmark-fill"></i>;
    }
    return <i className="bi bi-bookmark"></i>;
  };

  return (
    <>
      <h2>
        <span className={getBageClasses()}>{formatCount()}</span>
      </h2>

      {users.length > 0 && (
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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td> {renderBadgesQalities(user.qualities)}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} / 5</td>
                <td>
                  <button
                    type="button"
                    className="btn rounded-pill btn-dark"
                    onClick={() => handleToggleBookmark(user._id)}
                  >
                    {BookMark(user.isBookmark)}
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn rounded-pill btn-danger btn-sm"
                    onClick={() => handleDelete(user)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
