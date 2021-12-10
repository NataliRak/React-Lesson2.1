import React, { useState } from "react";
import Users from "./components/users";
import API from "./api";

function App() {
  const [users, setUsers] = useState(
    api.users.fetchAll().map((user) => {
      return { ...user, isBookmark: false };
    })
  );
  const [count, setCount] = useState(users.length);

  const handleDelete = (id) => {
    setCount((prevState) => prevState - 1);
    setUsers((prevState) => prevState.filter((user) => user !== id));
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

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  );
}

export default App;
