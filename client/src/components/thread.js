import React from 'react';
import CommentContainer from './commentcontainer';

const comments = [
  {
    author: 'Some person',
    content: 'Good post',
  },
  {
    author: 'Me',
    content: 'I dont like this post',
  },
  {
    author: 'Another person',
    content: 'asdklfjslfk',
  },
];

const Thread = props => {
  //const { title, author /*comments*/ } = props;
  const { content, author, title } = props.location.state;
  return (
    <div className="thread-container">
      <div className="thread-header">
        <h2>{title}</h2>
        <small>Posted By: {author}</small>
      </div>
      <div className="thread-content">
        <p>{content}</p>
      </div>
      <CommentContainer comments={comments} />
    </div>
  );
};

export default Thread;
