import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { USER } from '../constants'
import CustomCommunity from './CustomCommunity'
import { useMutation } from '@apollo/react-hooks'

import About from "./about";
import Posts from "./posts";
import Thread from "./thread";


const GET_COMMUNITY = gql`
  query GetCommunity($slug: String!) {
    getCommunity(slug: $slug) {
      id
      name
      about
      slug
      privacy
      hasMessages
      hasPosts
      users {
        id
        username
      }
      posts {
        id
        title
        content
        postedBy {
          username
          id
        }
      }
    }
  }
`;

const ADD_USER = gql`
  mutation AddUserToCommunity($communityId: String!) {
    addUserToCommunity(communityId: $communityId ) {
      id
    }
  }
`

export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.match.params.community
    };
  }


  render() {
    const username = localStorage.getItem(USER);
    const slug = this.state.slug;
    const collectionOfUsers = []

    return (
      <React.Fragment>
        <Query query={GET_COMMUNITY} variables={this.state}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;
            const { name, privacy, about, id, posts, users, slug, hasPosts, hasMessages } = data.getCommunity;
            return (
              <div className="community">
                {users.map(user => {
                  collectionOfUsers.push(user.username)
                })}
                {(!collectionOfUsers.includes(username)) ?
                  <div>
                    <Mutation mutation={ADD_USER} variables={{ communityId: id }} >
                      {mutation => <button onClick={mutation}>Click Here to Join!</button>}
                    </Mutation>
                  </div>
                  : <CustomCommunity
                    name={name}
                    privacy={privacy}
                    about={about}
                    id={id}
                    posts={posts}
                    slug={slug}
                    hasMessages={hasMessages}
                    hasPosts={hasPosts} />}
              </div>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
