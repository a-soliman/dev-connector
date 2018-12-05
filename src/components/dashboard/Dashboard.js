import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../ui/Spinner";

class Dashboard extends Component {
  componentDidMount = () => {
    const profile = this.props.getCurrentProfile();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO : Display Profile</h4>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="ro">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getCurrentProfile: () => dispatch(getCurrentProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
