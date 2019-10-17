import React from "react";
import { Link } from "react-router-dom";

//CSS
import '../styles/User.css'

const UserCommunities = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Communities {user.username} is a part of: </h2>
      <div className='user-communities' >
      {user.ownerOf.map(community => {
        return (
          <div className="profile-item" style={{background: 'tomato'}}>
            <Link to={`/community/${community.slug}`}>
              <h3>{community.name}</h3>
            </Link>
            <small>Topic: {community.category}</small>
          </div>
        );
      })}
      {user.communities.map(community => {
        return (
          <div className="profile-item" style={{background: 'tomato'}}>
            <Link to={`/community/${community.slug}`}>
              <h3>{community.name}</h3>
            </Link>
            <small>Topic: {community.category}</small>
          </div>
        );
      })}
      </div>
    </React.Fragment>
  );
};

export default UserCommunities;
