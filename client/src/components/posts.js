/* eslint-disable no-unreachable */
import React from "react";

import PostHeaderCard from "./postitem";

const Posts = props => {
  const { communityId, posts } = props;
  return posts.length ? (
    posts.map(item => {
      return (
        <div>
          <PostHeaderCard item={item} communityId={communityId} key={item.id} />
        </div>
      );
    })
  ) : (
    <div>
      <h1>Looks Like There Are No Posts Here :(</h1>
    </div>
  );
};

export default Posts;
