import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, editProfile } from "../../actions/profile";
import Form from "../ui/Form";

class EditProfile extends Component {
  state = {
    loading: false,
    displaySocialInputs: false,
    formData: {
      handle: {
        name: "handle",
        value: "",
        type: "text",
        placeholder: "Handle",
        instructions:
          "A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      status: {
        name: "status",
        value: "",
        type: "select",
        options: [
          "Developer",
          "Junior Developer",
          "Senior Developer",
          "Manager",
          "Student or Learning",
          "Instrutor or Teacher",
          "Intern",
          "Other"
        ],
        instructions: "Give us an idea of where you are at in your career",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      company: {
        name: "company",
        value: "",
        type: "text",
        placeholder: "Company",
        instructions: "Could be your own company or one you work for",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      website: {
        name: "website",
        value: "",
        type: "text",
        placeholder: "Website",
        instructions: "Could be your own or a company website",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      location: {
        name: "location",
        value: "",
        type: "text",
        placeholder: "Location",
        instructions: "City & state suggested (eg. Boston, MA)",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      skills: {
        name: "skills",
        value: "",
        type: "text",
        placeholder: "Skills",
        instructions:
          "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      githubusername: {
        name: "githubusername",
        value: "",
        type: "text",
        placeholder: "Github Username",
        instructions:
          "If you want your latest repos and a Github link, include your username",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      bio: {
        name: "bio",
        value: "",
        type: "textarea",
        placeholder: "A short bio of yourself",
        instructions: "Tell us a little about yourself",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      twitter: {
        inputGroup: true,
        icon: "twitter",
        name: "twitter",
        value: "",
        type: "text",
        placeholder: "Twitter Page URL",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      facebook: {
        inputGroup: true,
        icon: "facebook",
        name: "facebook",
        value: "",
        type: "text",
        placeholder: "Facebook Page URL",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      linkedin: {
        inputGroup: true,
        icon: "linkedin",
        name: "linkedin",
        value: "",
        type: "text",
        placeholder: "Linkedin Page URL",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      youtube: {
        inputGroup: true,
        icon: "youtube",
        name: "youtube",
        value: "",
        type: "text",
        placeholder: "Youtube Page URL",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      },
      instagram: {
        inputGroup: true,
        icon: "instagram",
        name: "instagram",
        value: "",
        type: "text",
        placeholder: "Instagram Page URL",
        validation: {
          required: false
        },
        valid: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount = () => {
    if (
      this.props.profile.profile !== null &&
      Object.keys(this.props.profile.profile).length > 0
    ) {
      const profile = this.props.profile.profile;
      this.generateStateValuesFromProfile(profile);
    } else {
      this.props.getCurrentProfile();
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.attachErrorsToState({ ...nextProps.errors });
    }
    if (nextProps.profile) {
      this.generateStateValuesFromProfile({ ...nextProps.profile.profile });
    }
  };

  generateStateValuesFromProfile = profile => {
    const newFormData = { ...this.state.formData };

    // attach the social links
    if (profile.social && Object.keys(profile.social).length > 0) {
      for (const socialField in profile.social) {
        if (newFormData[socialField]) {
          newFormData[socialField].value = profile.social[socialField];
        }
      }
    }
    // handle the rest of the input fields
    for (const field in profile) {
      if (newFormData[field]) {
        newFormData[field].value = profile[field];
      }
    }
    this.setState({
      formData: newFormData
    });
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

    const editedProfile = {};

    for (const field in this.state.formData) {
      editedProfile[field] = this.state.formData[field].value;
    }
    console.log(editedProfile);
    this.props.editProfile(editedProfile);
  };

  render() {
    const {
      handle,
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = this.state.formData;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <Form
                fields={[
                  handle,
                  status,
                  company,
                  website,
                  location,
                  skills,
                  githubusername,
                  bio,
                  twitter,
                  facebook,
                  linkedin,
                  youtube,
                  instagram
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
  auth: state.auth,
  errors: state.errors
});
const mapDispatchToProps = dispatch => ({
  getCurrentProfile: () => dispatch(getCurrentProfile()),
  editProfile: profileData => dispatch(editProfile(profileData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
