import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CREATE_POST_MUTATION = gql`
  mutation CreateNewPost(
    $communityId: String!
    $title: String!
    $content: String!
  ) {
    createNewPost(communityId: $communityId, title: $title, content: $content) {
      postedBy {
        username
      }
      id
      community {
        slug
      }
    }
  }
`;

export default class CreatPostForm extends Component {
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
    console.log(this.props);
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
        <Mutation mutation={CREATE_POST_MUTATION} variables={{ ...this.state }}>
          {createMutation => <button onClick={createMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}
