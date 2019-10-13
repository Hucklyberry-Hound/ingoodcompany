import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

const NEW_COMMENT = gql`
  mutation CreateNewComment($content: String!, $postId: String!) {
    createNewComment(content: $content, postId: $postId) {
      id
      content
      author {
        username
      }
      post {
        id
        community {
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
      content: "",
      postId,
      communityId,
      updateParent
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
            content
          }}
          onCompleted={mutation => {
            const comment = mutation.createNewComment;
            this.setState({ content: "" });
            updateParent(comment);
          }}
        >
          {doMutation => <button onClick={doMutation}>Reply</button>}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(CommentForm);
