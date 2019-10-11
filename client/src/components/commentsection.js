import React from 'react';
import Comment from './comment';

const CommentSection = props => {
  const { comments } = props;
  return comments.length ? (
    <React.Fragment>
      {comments.map((item, index) => (
        <Comment comment={item} />
      ))}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <h2>Looks like nobody replied to this post...</h2>
    </React.Fragment>
  );
};

export default CommentSection;
