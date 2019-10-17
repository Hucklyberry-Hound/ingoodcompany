import React from 'react';
import { Link } from 'react-router-dom';

const UserPosts = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Posts: </h2>
      <div className="user-communities">
        {user.posts.map(post => {
          return (
            <div className="profile-item" style={{ background: 'violet' }}>
              <h2>
                {user.username} posted to{' '}
                <Link to={`/community/${post.community.slug}`}>
                  {post.community.name}
                </Link>
                :
              </h2>
              <h4>
                <Link
                  to={`/community/${post.community.slug}/thread/${post.id}`}
                >
                  {post.title}
                </Link>
              </h4>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default UserPosts;
