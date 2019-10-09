import React from 'react';
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
    }
  }
`;

const comments = [
  {
    author: 'Some person',
    content: 'Good post',
  },
  {
    author: 'Me',
    content: 'I dont like this post',
  },
  {
    author: 'Another person',
    content: 'asdklfjslfk',
  },
];

const Thread = props => {
  const { postId } = props.match.params;
  return (
    <Query query={GET_ONE_POST} variables={{ postId }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading</div>;
        if (error) console.log(error);
        const thread = data.getPost;
        const { title, content, postedBy } = thread;
        const author = postedBy.username;
        return (
          <div className="thread-container">
            <div className="thread-header">
              <h2>{title}</h2>
              <small>Posted By: {author}</small>
            </div>
            <div className="thread-content">
              <p>{content}</p>
            </div>
            <CommentContainer comments={comments} />
          </div>
        );
      }}
    </Query>
  );
};

export default Thread;
