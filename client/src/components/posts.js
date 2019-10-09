import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import PostHeaderCard from './postitem';

const GET_POSTS = gql`
  {
    posts {
      id
      postedBy {
        username
      }
      title
      content
      slug
    }
  }
`;

const Posts = props => {
  const { community } = props;
  return (
    <div>
      <Link to={`/${community}/post/new`}>New Post</Link>
      <Query query={GET_POSTS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) console.log(error);
          const posts = data.posts;
          return posts.map(item => {
            return (
              <div>
                <PostHeaderCard
                  item={item}
                  community={community}
                  key={item.id}
                />
              </div>
            );
          });
        }}
      </Query>
    </div>
  );
};

export default Posts;
