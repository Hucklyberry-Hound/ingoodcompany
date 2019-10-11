import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import UserCommunities from './usercommunities';
import UserComments from './usercomments';
import UserPosts from './userposts';

const GET_USER = gql`
  query GetUser($username: String!) {
    userByHandle(username: $username) {
      username
      communities {
        name
        category
      }
      posts {
        title
        content
        community {
          name
        }
      }
      comments {
        content
        post {
          title
          community {
            name
          }
        }
      }
    }
  }
`;

const UserProfile = props => {
  const { username } = props.match.params;
  return (
    <Query query={GET_USER} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading</div>;
        if (error) console.log(error);
        const user = data.userByHandle;
        return (
          <div className="user-profile-container">
            <div className="user-profile">
              <h1>Profile Page of {user.username}</h1>
              <UserCommunities user={user} />
              <hr />
              <UserPosts user={user} />
              <hr />
              <UserComments user={user} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default UserProfile;
