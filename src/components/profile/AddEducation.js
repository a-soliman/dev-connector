import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Form from "../ui/Form";
import { addEducation } from "../../actions/profile";

class AddEducation extends Component {
  state = {
    loading: false,
    formData: {
      school: {
        name: "school",
        value: "",
        type: "text",
        placeholder: "School",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      degree: {
        name: "degree",
        value: "",
        type: "text",
        placeholder: "Degree",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      fieldofstudy: {
        name: "fieldofstudy",
        value: "",
        type: "text",
        placeholder: "Field of Study",
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
        label: "From:",
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
    console.log(this.state.formData["to"].disabled);
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

    const newEducation = {};

    for (const field in this.state.formData) {
      newEducation[field] = this.state.formData[field].value;
    }
    console.log(newEducation);
    this.props.addEducation(newEducation);
  };
  render() {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state.formData;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any education that you had in the past or current!
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <Form
                fields={[
                  school,
                  degree,
                  fieldofstudy,
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
  addEducation: newEducation => dispatch(addEducation(newEducation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEducation);
