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
    if (number === 2 || number === 3 || number === 4)
      return number + " " + "человека тусуется с тобой сегодня";
    return number === 0
      ? "никто не тусуется с тобой сегодня"
      : number + " " + "человек тусуется с тобой сегодня";
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

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
        renderBadgesQalities={renderBadgesQalities}
        renderPhrase={renderPhrase}
      />
    </>
  );
}

export default App;
