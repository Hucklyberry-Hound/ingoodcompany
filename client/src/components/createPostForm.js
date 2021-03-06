import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { GET_POSTS } from './posts';
import { GET_USER } from './user';
import { GET_COMMUNITIES } from './profilepage';
import { USER } from '../constants';

const CREATE_POST_MUTATION = gql`
  mutation CreateNewPost(
    $communityId: String!
    $title: String!
    $content: String!
  ) {
    createNewPost(communityId: $communityId, title: $title, content: $content) {
      id
      content
      title
      postedBy {
        id
        username
      }
      community {
        id
        slug
      }
    }
  }
`;

class CreatPostForm extends Component {
  constructor(props) {
    super();
    this.state = {
      communityId: props.communityId,
      title: '',
      content: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({ communityId: this.props.communityId });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const username = localStorage.getItem(USER);
    return (
      <div className="post-form-container">
        <form className="post-form">
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Post Title"
            required
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Create A New Post"
            name="content"
            multiline
            rows="6"
            value={this.state.content}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
        </form>
        <Mutation
          mutation={CREATE_POST_MUTATION}
          variables={{ ...this.state }}
          onCompleted={mutation => {
            const post = mutation.createNewPost;
            this.setState({ title: '', content: '' });
            this.props.updateParent(post);
          }}
          refetchQueries={() => {
            return [
              {
                query: GET_COMMUNITIES,
              },
              {
                query: GET_USER,
                variables: { username },
              },
              {
                query: GET_POSTS,
              },
            ];
          }}
        >
          {createMutation => (
            <Box p={3}>
              <Button
                p={10}
                variant="contained"
                color="primary"
                onClick={createMutation}
              >
                Submit
              </Button>
            </Box>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(CreatPostForm);
