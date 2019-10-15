import React from 'react';
import { Link } from 'react-router-dom';

const UserCommunities = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Communities {user.username} is a part of: </h2>
      {user.communities.map(community => {
        return (
          <div className="profile-item">
            <Link to={`/community/${community.slug}`}>
              <h3>{community.name}</h3>
            </Link>
            <small>Topic: {community.category}</small>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default UserCommunities;
