import React from 'react';
import {Link} from 'react-router-dom';

//CSS import
import '../styles/Post.css';

const PostItem = props => {
  const { item, slug } = props;
  const { postedBy, title, id, comments } = item;
  return (
    <div className="post-item">
      <div>
        <Link to={`/community/${slug}/thread/${id}`}>
          <h4>{title}</h4>
        </Link>
        <Link to={`/user/${postedBy.username}`}>
          <small> Posted By:</small>
          <p>{postedBy.username}</p>
        </Link>
        <p className="replies-text">{comments ? comments.length : 0} Replies</p>
      </div>
    </div>
  );
};

export default PostItem;
