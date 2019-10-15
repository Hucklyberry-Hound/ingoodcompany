import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
      title: "",
      content: "",
      updateParent: props.updateParent
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({ communityId: this.props.communityId });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    console.log(this.content);
  }

  render() {
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
            rowsMax="6"
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
            this.setState({ title: "", content: "" });
            this.state.updateParent(post);
          }}
        >
          {createMutation => (
            <Button
              variant="contained"
              color="primary"
              onClick={createMutation}
            >
              Submit
            </Button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(CreatPostForm);
