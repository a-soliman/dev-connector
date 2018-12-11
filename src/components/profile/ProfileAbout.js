import React, { Component } from "react";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {profile.bio ? (
              <div>
                <h3 className="text-center text-info">
                  {profile.user.name}'s Bio
                </h3>
                <p className="lead">{profile.bio}</p>
                <hr />
              </div>
            ) : null}

            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div
                className="d-flex flex-wrap justify-content-center align-items-center"
                style={{ width: "100%" }}
              >
                {profile.skills.map((skill, i) => (
                  <div className="p-3" key={i}>
                    <i className="fa fa-check" /> {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
