import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { deleteEducation } from "../../actions/profile";

class Education extends Component {
  onDeleteHandler = id => {
    this.props.deleteEducation(id);
  };

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.location}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          {moment(edu.from).format("MMM-YYYY")} -{" "}
          {edu.to ? moment(edu.to).format("MMM-YYYY") : "Currnet"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteHandler.bind(this, edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="">
        <h4 className="mb-3">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Location</th>
              <th>Field of Study</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
        Experience
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteEducation: id => dispatch(deleteEducation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Education);
