import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../ui/Spinner";

class Dashboard extends Component {
  componentDidMount = () => {
    const profile = this.props.getCurrentProfile();
    console.log(profile);
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = <h1>Hello!</h1>;
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
