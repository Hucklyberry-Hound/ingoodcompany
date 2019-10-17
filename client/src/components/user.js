import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import UserCommunities from "./usercommunities";
import UserComments from "./usercomments";
import UserPosts from "./userposts";

//CSS
import '../styles/User.css'

export const GET_USER = gql`
  query GetUser($username: String!) {
    userByHandle(username: $username) {
      username
      image
      firstName
      lastName
      ownerOf{
        id
        name
        category
        slug
        owner {
          username
        }
      }
      communities {
        id
        name
        category
      }
      posts {
        id
        title
        content
        community {
          id
          name
          slug
        }
      }
      comments {
        id
        content
        post {
          id
          title
          community {
            id
            name
            slug
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
              <h1>{user.firstName} {user.lastName}</h1>
              <h4>username: {user.username}</h4>
              <img src={user.image} />
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
