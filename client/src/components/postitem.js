import React from "react";
import Link from "@material-ui/core/Link";

const PostItem = props => {
  const { item, slug } = props;
  const { postedBy, title, id, comments } = item;
  return (
    <div className="post-item">
      <Link href={`/community/${slug}/thread/${id}`}>
        <h3>{title}</h3>
      </Link>
      <div className="post-item-info">
        <small className="post-item-text">
          Posted By:{" "}
          <Link href={`/user/${postedBy.username}`}>{postedBy.username}</Link>
        </small>
        <p className="replies-text">{comments.length} Replies</p>
      </div>
    </div>
  );
};

export default PostItem;
