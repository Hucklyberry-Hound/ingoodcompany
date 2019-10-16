import React from "react";
import Link from "@material-ui/core/Link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import CommentContainer from "./commentcontainer";

const GET_ONE_POST = gql`
  query GetPost($postId: String!) {
    getPost(id: $postId) {
      id
      title
      content
      postedBy {
        id
        username
      }
      comments {
        id
        content
        author {
          id
          username
        }
      }
      community {
        id
      }
    }
  }
`;

const Thread = props => {
  const { postId } = props.match.params;
  return (
    <Query query={GET_ONE_POST} variables={{ postId }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading</div>;
        if (error) console.log(error);
        const thread = data.getPost;
        const { title, content, postedBy, comments, community } = thread;
        const author = postedBy.username;
        return (
          <div className="thread-container">
            <div className="thread-top">
              <div className="thread-header">
                <h2>{title}</h2>
                <small>Posted By: </small>
                <Link href={`/user/${author}`}>
                  <small>{author}</small>
                </Link>
              </div>
              <div className="thread-content">
                <p>{content}</p>
              </div>
            </div>
            <CommentContainer
              communityId={community.id}
              postId={postId}
              comments={comments}
            />
          </div>
        );
      }}
    </Query>
  );
};

export default Thread;
