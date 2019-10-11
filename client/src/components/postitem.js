import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = props => {
  const { communityId, item } = props;
  const { postedBy, title, id } = item;
  return (
    <div>
      <Link to={`/community/${communityId}/thread/${id}`}>
        <h3>{title}</h3>
      </Link>
      <small> Posted By: {postedBy.username}</small>
    </div>
  );
};

export default PostItem;
