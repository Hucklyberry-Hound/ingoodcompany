import React from "react";
import { Link } from "react-router-dom";
import pin from'./images/pin-png.png'
 

//CSS
import "../styles/MemberList.css"

const MemberList = props => {
  const { users, communityName, owner } = props;
  return (
    <div className="community-item">
      <h1>Members of {communityName}: </h1>
      <h2 className="memeber-owner"> 
      <Link to={`/user/${owner.username}`}>
        <div className ="image-container-header">
        <img src={owner.image} />
        </div>
        Owner: {owner.username}</Link>
      </h2>
      <div className="all-users">
      {users.map(user => (
          <div className="one-user">
          <Link to={`/user/${user.username}`}>
          <div className='pin'>
            <img src={pin}/>
          </div>
          <div className="info">
          <div className="image-container">
            <img src={user.image} />
            </div>
            <p>{user.username}</p>
            </div>
          </Link>
          </div>
      ))}
      </div>
    </div>
  );
};

export default MemberList;
