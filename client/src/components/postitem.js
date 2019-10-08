import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = props => {
  const { community, item } = props;
  const { author, title, content } = item;
  const slug = title.replace(/\s/g, '').toLowerCase();
  return (
    <div>
      <Link
        to={{
          pathname: `/${community}/thread/${slug}`,
          state: { content, author, title },
        }}
      >
        <h3>{title}</h3>
      </Link>
      <small> Posted By: {author}</small>
    </div>
  );
};

export default PostItem;
