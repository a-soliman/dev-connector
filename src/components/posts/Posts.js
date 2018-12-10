import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";
import Form from "../ui/Form";
import { addPost } from "../../actions/post";

class Posts extends Component {
  state = {
    formData: {
      text: {
        name: "text",
        value: "",
        type: "textarea",
        placeholder: "Add A Post",
        validation: {
          required: true
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

  onFormUpdate = event => {
    const newFormData = { ...this.state.formData };
    const element = event.target.name;
    const value = event.target.value;
    newFormData[element].value = value;

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

  onFormSubmit = event => {
    event.preventDefault();

    /* VALIDATE DATA */

    const newPost = {};
    for (const field in this.state.formData) {
      newPost[field] = this.state.formData[field].value;
    }

    this.props.addPost(newPost);
  };
  render() {
    const { text } = this.state.formData;

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="post-form mb-3">
                <div className="card card-info">
                  <div className="card-header bg-info text-white">
                    Say Something...
                  </div>
                  <div className="card-body">
                    <Form
                      fields={[text]}
                      onChangleHandler={this.onFormUpdate}
                      onSubmitHandler={this.onFormSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  addPost: newPost => dispatch(addPost(newPost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
