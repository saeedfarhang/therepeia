import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
// import AdminView from './admin/AdminView'
import Dashboard from "./admin/Dashboard";
import Login from "./Login";
import Logout from "./Logout";
import ProductAction from "./admin/ProductAction/ProductAction";
import { axiosInstance } from "../axios";
import { UserId } from "../UserState";

// imports for material ui

export default function Routing() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axiosInstance.get(`accounts/getuser/${UserId()}/`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <Fragment>
      <Router forceRefresh={false}>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </Router>
      {user.is_superuser ? (
        <Router forceRefresh={true}>
          <Switch>
            <Route path="/admin" exact component={Dashboard} />
            <Route
              path="/admin/product/edit/:id"
              exact
              component={ProductAction}
            />
            <Route path="/admin/product/add" exact component={ProductAction} />
          </Switch>
        </Router>
      ) : (
        console.log("not")
      )}

      {/* <Footer /> */}
    </Fragment>
  );
}
