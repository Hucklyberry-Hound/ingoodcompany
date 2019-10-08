import React from 'react';
import { Link } from 'react-router-dom';

import PostHeaderCard from './postitem';

const Posts = props => {
  const { posts, community } = props;
  return (
    <div>
      <Link to={`/${community}/post/new`}>New Post</Link>
      {posts.map((item, index) => {
        return <PostHeaderCard item={item} community={community} key={index} />;
      })}
    </div>
  );
};

export default Posts;
