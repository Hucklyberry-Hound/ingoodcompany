import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { GET_USER } from './user';
import { GET_COMMUNITIES } from './profilepage';
import { GET_POSTS } from './posts';
import { USER } from '../constants'

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
    const username = localStorage.getItem(USER)

    const { postId, content, updateParent } = this.state;
    return (
      <div className="comment-form-container">
        <form name="newcomment" className="comment-form">
          <TextField
            className="comment-form-text-field"
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
          refetchQueries={() => {
            return [
              {
                query: GET_COMMUNITIES
              },
              {
                query: GET_USER,
                variables: { username }
              },
              {
                query: GET_POSTS

              }
            ];
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
