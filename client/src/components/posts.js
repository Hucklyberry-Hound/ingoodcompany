/* eslint-disable no-unreachable */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import PostContainer from './postscontainer';

import '../styles/Loading.css';


export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      postedBy {
        username
        id
      }
      community {
        name
        id
      }
      comments {
        id
      }
    }
  }
`;

const Posts = props => {
  const { communityId, slug } = props;
  return (
    <Query query={GET_POSTS} variables={{ communityId }}>
      {({ loading, error, data }) => {
        if (loading) return <div className='loader-container'><div className="loader"></div></div>;
        if (error) return console.log(error);
        const posts = data.posts.filter(
          post => post.community.id === communityId
        );
        return (
          <PostContainer posts={posts} communityId={communityId} slug={slug} />
        );
      }}
    </Query>
  );
};

export default Posts;
