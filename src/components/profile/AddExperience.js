import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Form from "../ui/Form";
import { addExperience } from "../../actions/profile";

class AddExperience extends Component {
  state = {
    loading: false,
    formData: {
      company: {
        name: "company",
        value: "",
        type: "text",
        placeholder: "Company",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      location: {
        name: "location",
        value: "",
        type: "text",
        placeholder: "Location",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      title: {
        name: "title",
        value: "",
        type: "text",
        placeholder: "Job title",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      from: {
        name: "from",
        value: "",
        type: "date",
        placeholder: "From",
        label: "From: ",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      to: {
        name: "to",
        value: "",
        type: "date",
        placeholder: "To",
        label: "To: ",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: "",
        disabled: false
      },
      current: {
        name: "current",
        value: false,
        type: "checkbox",
        placeholder: "current",
        label: "current: ",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      description: {
        name: "description",
        value: "",
        type: "textarea",
        placeholder: "Job description",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      }
    },
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.attachErrorsToState({ ...nextProps.errors });
    }
  };

  attachErrorsToState = errors => {
    const formData = { ...this.state.formData };
    const otherErrors = { ...this.state.errors };

    for (const field in formData) {
      if (errors[field]) {
        formData[field].valid = false;
        formData[field].validationMessage = errors[field];
      } else {
        formData[field].valid = true;
        formData[field].validationMessage = "";
      }
      delete errors[field];
    }
    for (const field in errors) {
      otherErrors[field] = errors[field];
    }

    this.setState({ formData, errors: otherErrors });
  };

  onCurrentCheck = event => {
    const newFormData = { ...this.state.formData };
    // update the current check value
    newFormData["current"].value = !newFormData["current"].value;
    newFormData["to"].disabled = !newFormData["to"].disabled;

    this.setState({ formData: newFormData });
  };

  onFormUpdate = event => {
    /* IF CHECKBOX CLICKED  */
    if (event.target.name === "current") {
      return this.onCurrentCheck(event);
    }
    const newFormData = { ...this.state.formData };
    const element = event.target.name;
    const value = event.target.value;
    newFormData[element].value = value;

    this.setState({
      formData: newFormData
    });
  };
  onFormSubmit = event => {
    event.preventDefault();

    /* VALIDATE DATA */

    const newExperience = {};

    for (const field in this.state.formData) {
      newExperience[field] = this.state.formData[field].value;
    }
    this.props.addExperience(newExperience);
  };
  render() {
    const {
      company,
      location,
      title,
      from,
      to,
      current,
      description
    } = this.state.formData;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you had in the past or current!
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <Form
                fields={[
                  company,
                  location,
                  title,
                  from,
                  to,
                  current,
                  description
                ]}
                onChangleHandler={this.onFormUpdate}
                onSubmitHandler={this.onFormSubmit}
              />
            </div>
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
  addExperience: newExperience => dispatch(addExperience(newExperience))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExperience);
