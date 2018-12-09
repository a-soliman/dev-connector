import React, { Component } from "react";
import moment from "moment";
import Education from "../dashboard/Education";

class ProfileCreds extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {profile.experience.map(exp => (
              <li className="list-group-item" key={exp._id}>
                <h4>
                  <strong>@ </strong>
                  {exp.company}
                </h4>
                <p>
                  {moment(exp.from).format("MMM, YYYY")} -
                  {exp.to ? moment(exp.to).format("MMM, YYYY") : " Current"}
                </p>
                <p>
                  <strong>Position:</strong> {exp.title}
                </p>
                <p>
                  <strong>Description:</strong> {exp.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {profile.education.map(edu => (
              <li className="list-group-item" key={edu._id}>
                <h4>
                  <strong>@ </strong>
                  {Education.school}
                </h4>
                <p>
                  {moment(edu.from).format("MMM, YYYY")} -
                  {edu.to ? moment(edu.to).format("MMM, YYYY") : " Current"}
                </p>
                <p>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu.fieldofstudy}
                </p>
                <p>
                  <strong>Description:</strong> {edu.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
