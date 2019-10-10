import React from "react";
import CommentCard from "./comment";

export default class CommentContainter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: props.comments };
  }

  render() {
    return this.state.comments.length ? (
      <div>
        <div className="comment-container">
          {this.state.comments.map((item, index) => {
            return <CommentCard key={index} comment={item} />;
          })}
        </div>
        <div>
          <form name="newcomment" className="comment-form">
            <h4>Reply To This Thread:</h4>
            <textarea placeholder="Reply to this thread" />
            <input className="submit-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    ) : (
      <div>
        <h2>Looks like nobody replied to this post...</h2>
        <form name="newcomment" className="comment-form">
          <h4>Be the first!:</h4>
          <textarea placeholder="Reply to this thread" />
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
