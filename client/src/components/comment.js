import React from 'react';

const Comment = props => {
  const { author, content } = props.comment;

  return (
    <div className="comment">
      <small>{author} wrote...:</small>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
