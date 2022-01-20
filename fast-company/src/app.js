import React from "react";
// import UsersListPage from "./components/page/usersListPage";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/ui/navbar";

import UserEdit from "./components/page/UserPageEdit/UserPageEdit";
import Users from "./layouts/Users";
import Login from "./layouts/login";
import Main from "./layouts/main";

import NotFound from "./layouts/notFound";

const App = () => {
  // const { pathname } = useLocation();
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route exact path="/users/:userId?" component={Users} />
        <Route path="/users/:userId?/edit" component={UserEdit} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      ;
    </>
  );
};

export default App;
