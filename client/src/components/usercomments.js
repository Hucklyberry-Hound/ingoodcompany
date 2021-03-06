import React from "react";
import Link from "@material-ui/core/Link";

//CSS
import '../styles/User.css'

const UserComments = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Comments: </h2>
      <div className="user-communities">
      {user.comments.map(comment => {
        return (
          <div className="profile-item" >
            <h3>
              {user.username} commented on{" "}
              <Link
                href={`/community/${comment.post.community.slug}/thread/${comment.post.id}`}
              >
                {comment.post.title}
              </Link>{" "}
              in{" "}
              <Link href={`/community/${comment.post.community.slug}`}>
                {comment.post.community.name}:
              </Link>
            </h3>
            <small>{comment.content}</small>
          </div>
        );
      })}
      </div>
    </React.Fragment>
  );
};

export default UserComments;
