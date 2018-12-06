import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

/* LAYOUT COMPONENTS */
import Navbar from "../components/layout/Navbar";
import Landing from "../components/layout/Landing";
import Footer from "../components/layout/Footer";

/* AUTH COMPONENTS */
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

/* DASHBOARD COMPONENTS */
import Dashboard from "../components/dashboard/Dashboard";

/* PROFILE COMPONENTS */
import CreateProfile from "../components/create-profile/CreateProfile";
import EditProfile from "../components/dashboard/EditProfile";
import AddExperience from "../components/dashboard/AddExperience";
import AddEducation from "../components/dashboard/AddEducation";

import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Navbar />
      <Switch>
        <PublicRoute
          path="/"
          component={Landing}
          exact={true}
          no_container={true}
        />
        <PublicRoute path="/register" component={Register} exact={true} />
        <PublicRoute path="/login" component={Login} exact={true} />

        <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
        <PrivateRoute
          path="/edit-profile"
          component={EditProfile}
          exact={true}
        />
        <PrivateRoute
          path="/add-experience"
          component={AddExperience}
          exact={true}
        />
        <PrivateRoute
          path="/add-education"
          component={AddEducation}
          exact={true}
        />
        <PrivateRoute
          path="/create-profile"
          component={CreateProfile}
          exact={true}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
