import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../ui/Spinner";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import { getProfileByHabdle } from "../../actions/profile";
import isEmpty from "../../validation/is-empty";

class Profile extends Component {
  componentDidMount = () => {
    const handle = this.props.match.params.handle;
    this.props.getProfileByHabdle(handle);
  };

  render() {
    const { profile, loading } = this.props.profile;
    let profileTemplate;

    if (profile === null || loading) {
      profileTemplate = <Spinner />;
    } else {
      profileTemplate = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds profile={profile} />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileTemplate}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getProfileByHabdle: handle => dispatch(getProfileByHabdle(handle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
