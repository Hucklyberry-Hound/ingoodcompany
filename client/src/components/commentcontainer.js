import React from 'react';
import CommentForm from './commentform';
import CommentSection from './commentsection';

class CommentContainer extends React.Component {
  constructor(props) {
    const { comments, communityId, postId } = props;
    super(props);
    this.state = {
      comments,
      communityId,
      postId,
    };

    this.update = this.update.bind(this);
  }

  update(newComment) {
    this.setState({ comments: [...this.state.comments, newComment] });
  }

  render() {
    const { comments, communityId, postId } = this.state;
    return (
      <div className="comment-container">
        <h2 className="replies-header">Replies:</h2>
        <CommentSection comments={comments} />
        <CommentForm
          postId={postId}
          communityId={communityId}
          updateParent={this.update}
        />
      </div>
    );
  }
}

export default CommentContainer;
