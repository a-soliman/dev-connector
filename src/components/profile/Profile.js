import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";
import { getProfileByHabdle } from "../../actions/profile";

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
      profileTemplate = <h1>{profile.user.name}</h1>;
    }

    return <div>{profileTemplate}</div>;
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
