import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, unLike } from "../../actions/post";

class PostItem extends Component {
  onDeleteClick = id => {
    this.props.deletePost(id);
  };
  onAddLike = id => {
    this.props.addLike(id);
  };
  onUnLike = id => {
    this.props.unLike(id);
  };
  likedByCurrentUser = likes => {
    return (
      likes.filter(like => like.user == this.props.auth.user.id).length > 0
    );
  };

  render() {
    const { post, auth, showActions = true } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                {" "}
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.onAddLike.bind(this, post._id)}
                >
                  <i
                    className={classnames("fa fa-thumbs-up", {
                      "text-info": this.likedByCurrentUser(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.onUnLike.bind(this, post._id)}
                >
                  <i className="fa fa-thumbs-down text-secondary" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                  >
                    <i className="fa fa-times" />
                  </button>
                ) : null}
              </span>
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
  deletePost: id => dispatch(deletePost(id)),
  addLike: id => dispatch(addLike(id)),
  unLike: id => dispatch(unLike(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
