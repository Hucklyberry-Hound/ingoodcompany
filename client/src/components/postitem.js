import React from "react";
import Link from "@material-ui/core/Link";

const PostItem = props => {
  const { item, slug } = props;
  const { postedBy, title, id } = item;
  return (
    <div>
      <Link href={`/community/${slug}/thread/${id}`}>
        <h3>{title}</h3>
      </Link>
      <Link href={`/user/${postedBy.username}`}>
        <small>Posted By: </small>
        <small>{postedBy.username}</small>
      </Link>
    </div>
  );
};

export default PostItem;
