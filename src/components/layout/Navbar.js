import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { clearCurrentProfile } from "../../actions/profile";

export class Navbar extends React.Component {
  onLogoutHandler = () => {
    this.props.clearCurrentProfile();
    this.props.logout();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinkes = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/feed" className="nav-link">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={this.onLogoutHandler}>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{
                width: "25px",
                marginRight: "10px"
              }}
            />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinkes = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign Up
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/profiles" className="nav-link">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinkes : guestLinkes}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  clearCurrentProfile: () => dispatch(clearCurrentProfile()),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
