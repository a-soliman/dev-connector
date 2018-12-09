import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { deleteExperience } from "../../actions/profile";

class Experience extends Component {
  onDeleteHandler = id => {
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {moment(exp.from).format("MMM-YYYY")} -{" "}
          {exp.to ? moment(exp.to).format("MMM-YYYY") : "Currnet"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteHandler.bind(this, exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="">
        <h4 className="mb-3">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteExperience: id => dispatch(deleteExperience(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experience);
