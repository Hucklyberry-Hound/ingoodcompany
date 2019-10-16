import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

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
      <div className="comment-form">
        <form name="newcomment" className="comment-form">
          <TextField
            label="Reply To This Thread"
            name="content"
            multiline
            rows="6"
            value={this.state.content}
            onChange={this.handleOnChange}
            margin="normal"
            variant="outlined"
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
            <Box p={3}>
              <Button variant="contained" color="primary" onClick={doMutation}>
                Reply
              </Button>
            </Box>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(CommentForm);
