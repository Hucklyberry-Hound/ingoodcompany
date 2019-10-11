import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const NEW_COMMENT = gql`
  mutation CreateNewComment($content: String!, $postId: String!) {
    createNewComment(content: $content, postId: $postId) {
      post {
        id
        community {
          slug
        }
      }
    }
  }
`;

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    const { postId, authorId, communityId } = props;
    this.state = {
      content: '',
      postId,
      communityId,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    const { postId, content, communityId } = this.state;
    return (
      <div>
        <form name="newcomment" className="comment-form">
          <h4>Reply To This Thread:</h4>
          <textarea
            value={this.state.content}
            onChange={this.handleOnChange}
            placeholder="Reply to this thread"
          />
          <Mutation
            mutation={NEW_COMMENT}
            variables={{
              postId,
              content,
            }}
            onCompleted={newComment => {
              this.props.history.push(
                `/community/${newComment.community.slug}/thread/${newComment.post.id}`
              );
            }}
          >
            {doMutation => <button onClick={doMutation}>Reply</button>}
          </Mutation>
        </form>
      </div>
    );
  }
}
