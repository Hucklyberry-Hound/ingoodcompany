import React from "react";
import { Link } from "react-router-dom";

const PostItem = props => {
  const { item, slug } = props;
  const { postedBy, title, id } = item;
  return (
    <div>
      <Link to={`/community/${slug}/thread/${id}`}>
        <h3>{title}</h3>
      </Link>
      <Link to={`/user/${postedBy.username}`}>
        <small> Posted By: {postedBy.username}</small>
      </Link>
    </div>
  );
};

export default PostItem;
