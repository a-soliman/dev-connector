import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "../ui/Form";

class CreateProfile extends Component {
  state = {
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

  onFormSubmit = event => {
    event.preventDefault();
  };

  onFormUpdate = event => {
    console.log("update.");
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
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Create Your Profile</h1>
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfile);
