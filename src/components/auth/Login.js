import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    loading: false,
    formData: {
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

  onFormSubmit = event => {
    event.preventDefault();

    /* VALIDATE DATA */

    const userData = {};
    for (const field in this.state.formData) {
      userData[field] = this.state.formData[field].value;
    }

    // axios.post('/api/users/register', userD)
  };
  render() {
    const { email, password } = this.state.formData;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type={email.type}
                    value={email.value}
                    onChange={this.onFormUpdate}
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type={password.type}
                    value={password.value}
                    onChange={this.onFormUpdate}
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                  />
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

export default Login;
