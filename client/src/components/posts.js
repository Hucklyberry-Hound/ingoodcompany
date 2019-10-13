/* eslint-disable no-unreachable */
import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import PostContainer from "./postscontainer";

const GET_POSTS = gql`
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
    }
  }
`;

const Posts = props => {
  const { communityId, slug } = props;
  return (
    <Query query={GET_POSTS} variables={{ communityId }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading</div>;
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
