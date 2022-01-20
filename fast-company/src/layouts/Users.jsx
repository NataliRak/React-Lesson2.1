import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEdit from "../components/page/UserPageEdit/UserPageEdit";
const Users = () => {
  const { userId, edit } = useParams();

  if (userId && edit) {
    return <UserEdit userId={userId} />;
  } else if (userId) {
    return <UserPage userId={userId} />;
  } else {
    return <UsersListPage />;
  }
};

export default Users;
