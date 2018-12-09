import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import Spinner from "../ui/Spinner";
import { getProfiles } from "../../actions/profile";

class Profiles extends Component {
  componentDidMount = () => {
    this.props.getProfiles();
  };
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem profile={profile} key={profile._id} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Brows and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getProfiles: () => dispatch(getProfiles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
