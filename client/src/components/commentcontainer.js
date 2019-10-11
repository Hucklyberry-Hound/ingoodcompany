import React from 'react';
import CommentCard from './comment';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const NEW_COMMENT = gql`
  mutation CreateNewComment(
    $content: String!
    $authorId: String!
    $postId: String!
  ) {
    createNewComment(content: $content, authorId: $authorId, postId: $postId) {
      post {
        id
      }
    }
  }
`;

export default class CommentContainter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments,
      content: '',
      postId: props.postId,
      authorId: 'ck1l6w9edlao90b09igjj0hcu',
      communityId: props.communityId,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    console.log(event.target.value);
    this.setState({ content: event.target.value });
  }

  render() {
    const { postId, authorId, content } = this.state;
    return this.state.comments.length ? (
      <div>
        <div className="comment-container">
          <h1>Replies To This Thread:</h1>
          {this.state.comments.map((item, index) => {
            return <CommentCard key={index} comment={item} />;
          })}
        </div>
        <div>
          <form name="newcomment" className="comment-form">
            <h4>Reply To This Thread:</h4>
            <textarea
              value={this.state.inputText}
              onChange={this.handleOnChange}
              placeholder="Reply to this thread"
            />
            <Mutation
              mutation={NEW_COMMENT}
              variables={{
                postId,
                authorId,
                content,
              }}
              onCompleted={data => {
                console.log(data);
                this.props.history.push(
                  `/community/${this.state.communityId}/thread/${data.post.id}`
                );
              }}
            >
              {doMutation => <button onClick={doMutation}>Reply</button>}
            </Mutation>
          </form>
        </div>
      </div>
    ) : (
      <div>
        <h2>Looks like nobody replied to this post...</h2>
        <form name="newcomment" className="comment-form">
          <h4>Be the first!:</h4>
          <textarea
            value={this.state.inputText}
            onChange={this.handleOnChange}
            placeholder="Reply to this thread"
          />
          <Mutation
            mutation={NEW_COMMENT}
            variables={{
              postId,
              authorId,
              content,
            }}
            onCompleted={data => {
              console.log(data);
              this.props.history.push(
                `/community/${this.state.communityId}/thread/${data.post.id}`
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
