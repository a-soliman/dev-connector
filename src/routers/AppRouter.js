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
import CreateProfile from "../components/profile/CreateProfile";
import EditProfile from "../components/profile/EditProfile";
import AddExperience from "../components/profile/AddExperience";
import AddEducation from "../components/profile/AddEducation";
import Profiles from "../components/profile/Profiles";

import NotFoundPage from "../components/NotFoundPage";
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

        <PublicRoute path="/profiles" component={Profiles} exact={true} />

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
