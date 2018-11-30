import React, { Component } from "react";
import Axios from "axios";
import classnames from 'classnames';

class Register extends Component {
  state = {
    name: "",
    loading: false,
    formData: {
      name: {
        value: "",
        type: "text",
        placeholder: "Name",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      email: {
        value: "",
        type: "email",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      password: {
        value: "",
        type: "password",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      passwordConfirmation: {
        value: "",
        type: "password",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      }
    },
    errors: {}
  };

  onFormUpdate = event => {
    const newFormData = { ...this.state.formData };
    const element = event.target.name;
    const value = event.target.value;
    newFormData[element].value = value;

    this.setState({
      formData: newFormData
    });
  };

  attachErrorsToState = (errors) => {
    const formData = { ...this.state.formData };
    for (const field in formData) {
      if (errors[field]) {
        formData[field].valid = false;
        formData[field].validationMessage = errors[field];
      }
    };
    this.setState({ formData });
  }

  onFormSubmit = event => {
    event.preventDefault();

    /* VALIDATE DATA */

    const newUserData = {};
    for (const field in this.state.formData) {
      newUserData[field] = this.state.formData[field].value;
    }
    /* SEND TO THE API */
    Axios.post("/api/users/register", newUserData)
      .then(res => console.log(res.data))
      .catch(err => this.attachErrorsToState(err.response.data));
  };

  render() {
    const { name, email, password, passwordConfirmation } = this.state.formData;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type={name.type}
                    value={name.value}
                    onChange={this.onFormUpdate}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': name.validationMessage
                    })}
                    placeholder="Name"
                    name="name"
                  />
                  {name.validationMessage && (<div className="invalid-feedback">{name.validationMessage}</div>)}

                </div>
                <div className="form-group">
                  <input
                    type={email.type}
                    value={email.value}
                    onChange={this.onFormUpdate}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': email.validationMessage
                    })}
                    placeholder="Email Address"
                    name="email"
                  />
                  {email.validationMessage && (<div className="invalid-feedback">{email.validationMessage}</div>)}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type={password.type}
                    value={password.value}
                    onChange={this.onFormUpdate}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': password.validationMessage
                    })}
                    placeholder="Password"
                    name="password"
                  />
                  {password.validationMessage && (<div className="invalid-feedback">{password.validationMessage}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type={passwordConfirmation.type}
                    value={passwordConfirmation.value}
                    onChange={this.onFormUpdate}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': passwordConfirmation.validationMessage
                    })}
                    placeholder="Confirm Password"
                    name="passwordConfirmation"
                  />
                  {passwordConfirmation.validationMessage && (<div className="invalid-feedback">{passwordConfirmation.validationMessage}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
