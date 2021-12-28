import React from "react";
import Users from "./components/users";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import UserPage from "./components/userPage";
import Login from "./layouts/login";
import Main from "./layouts/main";

import NotFound from "./layouts/notFound";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="/users" component={Users} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      ;
    </>
  );
};

export default App;
