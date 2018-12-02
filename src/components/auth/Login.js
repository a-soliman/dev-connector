import React, { Component } from "react";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { login } from '../../actions/auth';
import GoogleButton from '../ui/GoogleButton';

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

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.attachErrorsToState({ ...nextProps.errors });
    }
  };

  attachErrorsToState = (errors) => {
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
    };
    for (const field in errors) {
      otherErrors[field] = errors[field];
    };

    this.setState({ formData, errors: otherErrors });
  }

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

    this.props.login(userData);
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
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': email.validationMessage
                    })}
                    placeholder="Email Address"
                    name="email"
                  />
                  {email.validationMessage && (<div className="invalid-feedback">{email.validationMessage}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type={password.type}
                    value={password.value}
                    onChange={this.onFormUpdate}
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': password.validationMessage
                    })}
                    placeholder="Password"
                    name="password"
                  />
                  {password.validationMessage && (<div className="invalid-feedback">{password.validationMessage}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>

              <div className="text-info rounded-circle border border-info my-5 or">Or</div>
              <GoogleButton link="/api/users/google" text="Login with Google" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(login(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
