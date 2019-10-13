import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

const CREATE_POST_MUTATION = gql`
  mutation CreateNewPost(
    $communityId: String!
    $title: String!
    $content: String!
  ) {
    createNewPost(communityId: $communityId, title: $title, content: $content) {
      id
      postedBy {
        username
      }
      community {
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
      content: ""
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
  }

  render() {
    return (
      <div>
        <form className="post-form">
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Post Title"
            required
          />
          <textarea
            placeholder="Make a new post"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            required
          />
        </form>
        <Mutation
          mutation={CREATE_POST_MUTATION}
          variables={{ ...this.state }}
          onCompleted={newPost => {
            const post = newPost.createNewPost;
            this.props.history.push(
              `/community/${post.community.slug}/thread/${post.id}`
            );
          }}
        >
          {createMutation => <button onClick={createMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(CreatPostForm);
