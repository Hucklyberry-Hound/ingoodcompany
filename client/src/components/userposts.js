import React from 'react';

const UserPosts = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Posts: </h2>
      {user.posts.map(post => {
        return (
          <div className="profile-item">
            <h2>
              {user.username} posted to {post.community.name}:
            </h2>
            <h4>{post.title}</h4>
            <small>{post.content}</small>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default UserPosts;
