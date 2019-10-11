import React from 'react';
import CommentForm from './commentform';
import CommentSection from './commentsection';

const CommentContainer = props => {
  const { comments, communityId, postId, authorId } = props;
  return (
    <div className="comment-container">
      <h2>Replies:</h2>
      <CommentSection comments={comments} />
      <CommentForm
        postId={postId}
        communityId={communityId}
        authorId={authorId}
      />
    </div>
  );
};

export default CommentContainer;
