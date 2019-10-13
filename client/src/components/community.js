import React from "react";
import { Redirect } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { USER } from "../constants";
import CustomCommunity from "./CustomCommunity";
import { useMutation } from "@apollo/react-hooks";

import JoinPage from "./joinpage";

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

export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.match.params.community
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const username = localStorage.getItem(USER);
    const slug = this.state.slug;

    return (
      <React.Fragment>
        <Query query={GET_COMMUNITY} variables={this.state}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;
            const {
              name,
              privacy,
              about,
              id,
              posts,
              users,
              slug,
              hasPosts,
              hasMessages
            } = data.getCommunity;
            console.log(users);
            return (
              <div className="community">
                {users.map(user => user.username).includes(username) ? (
                  <CustomCommunity
                    name={name}
                    privacy={privacy}
                    about={about}
                    id={id}
                    posts={posts}
                    slug={slug}
                    hasMessages={hasMessages}
                    hasPosts={hasPosts}
                    users={users}
                  />
                ) : (
                  <div>
                    <Redirect
                      to={{
                        pathname: "/join",
                        state: {
                          communityId: id,
                          slug
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
