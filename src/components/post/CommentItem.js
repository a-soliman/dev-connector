import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

class CommentItem extends Component {
  onDeleteClick = ({ postId, commentId }) => {
    this.props.deleteComment({ postId, commentId });
  };
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt={comment.name}
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>

            {comment.user === auth.user.id ? (
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={this.onDeleteClick.bind(this, {
                  postId: postId,
                  commentId: comment._id
                })}
              >
                <i className="fa fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  deleteComment: data => dispatch(deleteComment(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
