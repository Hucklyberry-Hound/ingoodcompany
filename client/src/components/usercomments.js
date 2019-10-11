import React from 'react';
import { Link } from 'react-router-dom';

const UserComments = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Comments: </h2>
      {user.comments.map(comment => {
        return (
          <div className="profile-item">
            <h3>
              {user.username} commented on {comment.post.title} in{' '}
              {comment.post.community.name}:
            </h3>
            <small>{comment.content}</small>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default UserComments;
