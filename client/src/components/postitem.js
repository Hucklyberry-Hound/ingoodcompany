import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = props => {
  const { community, item } = props;
  const { postedBy, title, id, content, slug } = item;
  return (
    <div>
      <Link to={`/community/${community}/thread/${id}`}>
        <h3>{title}</h3>
      </Link>
      <small> Posted By: {postedBy.username}</small>
    </div>
  );
};

export default PostItem;
