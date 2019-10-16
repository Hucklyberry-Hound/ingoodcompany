import React from "react";
import Link from "@material-ui/core/Link";

const UserPosts = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Posts: </h2>
      {user.posts.map(post => {
        return (
          <div className="profile-item">
            <h2>
              {user.username} posted to{" "}
              <Link href={`/community/${post.community.slug}`}>
                {post.community.name}
              </Link>
              :
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
