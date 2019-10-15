import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';

const NEW_COMMENT = gql`
  mutation CreateNewComment($content: String!, $postId: String!) {
    createNewComment(content: $content, postId: $postId) {
      id
      content
      author {
        id
        username
      }
      post {
        id
        community {
          id
          slug
        }
      }
    }
  }
`;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    const { postId, communityId, updateParent } = props;
    this.state = {
      content: '',
      postId,
      communityId,
      updateParent,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    const { postId, content, updateParent } = this.state;
    return (
      <div>
        <form name="newcomment" className="comment-form">
          <h4>Reply To This Thread:</h4>
          <textarea
            value={this.state.content}
            onChange={this.handleOnChange}
            placeholder="Reply to this thread"
          />
        </form>
        <Mutation
          mutation={NEW_COMMENT}
          variables={{
            postId,
            content,
          }}
          onCompleted={mutation => {
            const comment = mutation.createNewComment;
            updateParent(comment);
            this.setState({ content: '' });
            return (
              <p>
                Your comment has been posted if it doesn't show up, try
                refreshing this page!
              </p>
            );
          }}
        >
          {doMutation => (
            <Button variant="contained" color="primary" onClick={doMutation}>
              Reply
            </Button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(CommentForm);
