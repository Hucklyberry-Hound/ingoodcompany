import React from 'react';

const UserCommunities = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Commuities {user.username} is a part of: </h2>
      {user.communities.map(community => {
        return (
          <div className="profile-item">
            <h3>{community.name}</h3>
            <small>Topic: {community.category}</small>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default UserCommunities;
