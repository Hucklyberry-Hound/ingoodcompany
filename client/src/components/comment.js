import React from "react";
import Link from "@material-ui/core/Link";

const Comment = props => {
  const { author, content } = props.comment;

  return (
    <div className="comment">
      <small className="comment-author">
        <Link href={`/user/${author.username}`}>{author.username}</Link>{" "}
        wrote...:
      </small>
      <p className="comment-text">{content}</p>
    </div>
  );
};

export default Comment;
