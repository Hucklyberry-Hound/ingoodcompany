import React from 'react';
import { Link } from 'react-router-dom';

const Comment = props => {
  const { author, content } = props.comment;

  return (
    <div className="comment">
      <Link to={`/user/${author.username}`}>
        <small>{author.username} wrote...:</small>
      </Link>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
