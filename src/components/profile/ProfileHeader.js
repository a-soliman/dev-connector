import React, { Component } from "react";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt={profile.user.name}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              {profile.status ? (
                <p className="lead text-center">
                  {profile.status}{" "}
                  {profile.company ? <span>@ {profile.company}</span> : null}
                </p>
              ) : null}

              {profile.location ? <p>{profile.location}</p> : null}

              {profile.website ? (
                <a className="text-white p-2" href={profile.website}>
                  <i className="fa fa-globe" />
                </a>
              ) : null}
              {profile.social && Object.keys(profile.social).length > 0 ? (
                <p>
                  {profile.social.twitter ? (
                    <a className="text-white p-2" href={profile.social.twitter}>
                      <i className="fab fa-twitter" />
                    </a>
                  ) : null}

                  {profile.social.facebook ? (
                    <a
                      className="text-white p-2"
                      href={profile.social.facebook}
                    >
                      <i className="fab fa-facebook" />
                    </a>
                  ) : null}

                  {profile.social.linkedin ? (
                    <a
                      className="text-white p-2"
                      href={profile.social.linkedin}
                    >
                      <i className="fab fa-linkedin" />
                    </a>
                  ) : null}

                  {profile.social.instagram ? (
                    <a
                      className="text-white p-2"
                      href={profile.social.instagram}
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  ) : null}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
