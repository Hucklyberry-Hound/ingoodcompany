import React from "react";
import Link from "@material-ui/core/Link";

const MemberList = props => {
  const { users, communityName, owner } = props;
  return (
    <div className="community-item">
      <h1>Members of {communityName}: </h1>
      <h2>
        Owner: <Link href={`/user/${owner.username}`}>{owner.username}</Link>
      </h2>
      {users.map(user => (
        <Link href={`/user/${user.username}`}>
          <p>{user.username}</p>
        </Link>
      ))}
    </div>
  );
};

export default MemberList;
