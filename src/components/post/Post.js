import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";
import Form from "../ui/Form";
import PostItem from "../posts/PostItem";
import { getPost, addComment } from "../../actions/post";

class Post extends Component {
  state = {
    formData: {
      text: {
        name: "text",
        value: "",
        type: "textarea",
        placeholder: "Reply to post",
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
    this.props.getPost(this.props.match.params.id);
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

    const newComment = {};
    for (const field in this.state.formData) {
      newComment[field] = this.state.formData[field].value;
    }

    this.props.addComment({
      id: this.props.post.post._id,
      comment: newComment
    });

    const newFormData = { ...this.state.formData };
    newFormData["text"].value = "";
    this.setState({ formData: newFormData });
  };

  render() {
    const { text } = this.state.formData;
    const { post, loading } = this.props.post;
    let postTemplate;

    if (post === null || loading || Object.keys(post).length === 0) {
      postTemplate = <Spinner />;
    } else {
      postTemplate = (
        <div>
          <PostItem post={post} showActions={false} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postTemplate}

              <div className="post-form mb-3">
                <div className="card card-info">
                  <div className="card-header bg-info text-white">
                    Make a comment...
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPost(id)),
  addComment: id => dispatch(addComment(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
