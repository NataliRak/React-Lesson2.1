import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
  const [users, setUsers] = useState(
    api.users.fetchAll().map((user) => {
      return { ...user, isBookmark: false };
    })
  );

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

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
        renderPhrase={renderPhrase}
      />
    </>
  );
}

export default App;
