/* eslint-disable no-unreachable */
import React from 'react';
import PostItem from './postitem';
import CreatePostForm from './createPostForm';

const Posts = props => {
  const { communityId, posts } = props;
  return posts.length ? (
    <div>
      <CreatePostForm communityId={communityId} />
      {posts.map(item => {
        return (
          <div>
            <PostItem item={item} communityId={communityId} key={item.id} />
          </div>
        );
      })}
    </div>
  ) : (
      <div>
        <h1>Looks Like There Are No Posts Here :(</h1>
        <CreatePostForm communityId={communityId} />
      </div>
    );
};

export default Posts;
