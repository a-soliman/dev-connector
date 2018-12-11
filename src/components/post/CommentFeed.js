import React, { Component } from "react";
import CommentItem from "./CommentItem";
import Spinner from "../ui/Spinner";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    let commentsTemplate;

    if (!Array.isArray(comments)) commentsTemplate = <Spinner />;
    else
      commentsTemplate = comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ));
    return commentsTemplate;
  }
}

export default CommentFeed;
