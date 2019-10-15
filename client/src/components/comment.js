import React from "react";
import Link from "@material-ui/core/Link";

const Comment = props => {
  const { author, content } = props.comment;

  return (
    <div className="comment">
      <Link href={`/user/${author.username}`}>
        <small>{author.username}</small>
      </Link>
      <small> wrote...:</small>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
