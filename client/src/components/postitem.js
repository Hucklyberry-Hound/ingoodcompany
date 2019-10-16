import React from 'react';
import Link from '@material-ui/core/Link';

//CSS import
import '../styles/Post.css';

const PostItem = props => {
  const { item, slug } = props;
  const { postedBy, title, id, comments } = item;
  return (
    <div className="post-item">
      <div>
        <Link href={`/community/${slug}/thread/${id}`}>
          <h4>{title}</h4>
        </Link>
        <Link href={`/user/${postedBy.username}`}>
          <small> Posted By:</small>
          <p>{postedBy.username}</p>
        </Link>
        <p className="replies-text">{comments ? comments.length : 0} Replies</p>
      </div>
    </div>
  );
};

export default PostItem;
