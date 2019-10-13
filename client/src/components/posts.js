/* eslint-disable no-unreachable */
import React from "react";
import PostItem from "./postitem";
import CreatePostForm from "./createPostForm";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
        return posts.length ? (
          <div>
            <CreatePostForm communityId={communityId} />
            {posts.map(post => {
              return (
                <PostItem
                  item={post}
                  slug={slug}
                  communityId={communityId}
                  key={post.id}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <h1>Looks Like There Are No Posts Here :(</h1>
            <CreatePostForm communityId={communityId} />
          </div>
        );
      }}
    </Query>
  );
};

export default Posts;
