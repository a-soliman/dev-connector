import React from "react";
import { Link } from "react-router-dom";

const PrfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fa fa-user-circle text-info" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fas fa-briefcase text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fa fa-graducation-cap" />
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default PrfileActions;
