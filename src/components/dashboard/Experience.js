import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class Experience extends Component {
  onDeleteHandler = id => {
    console.log("Deleting: ", id);
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
    console.log(experience);
    return (
      <div className="">
        <h4 className="mb-">Experience Credentials</h4>
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
        Experience
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

export default connect()(Experience);
