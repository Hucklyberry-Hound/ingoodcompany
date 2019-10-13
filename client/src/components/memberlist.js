import React from "react";
import { Link } from "react-router-dom";

const MemberList = props => {
  const { users, communityName } = props;
  return (
    <div>
      <h1>Members of {communityName}: </h1>
      {users.map(user => (
        <Link to={`/user/${user.username}`}>
          <p>{user.username}</p>
        </Link>
      ))}
    </div>
  );
};

export default MemberList;
