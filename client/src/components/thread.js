import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import CommentContainer from './commentcontainer';

const GET_ONE_POST = gql`
  query GetPost($postId: String!) {
    getPost(id: $postId) {
      title
      content
      postedBy {
        username
      }
      comments {
        author {
          username
        }
        content
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
            <div className="thread-header">
              <h2>{title}</h2>
              <Link to={`/user/${author}`}>
                <small>Posted By: {author}</small>
              </Link>
            </div>
            <div className="thread-content">
              <p>{content}</p>
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
