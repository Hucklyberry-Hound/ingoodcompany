import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ParseCommunityQuery from "./parsecommunityquery";
import { withRouter } from "react-router-dom";

const GET_NEW_MEMBER = gql`
  subscription {
    newMember {
      id
      username
    }
  }
`;

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
      owner {
        id
        username
      }
      users {
        id
        username
      }
    }
  }
`;

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.match.params.community
    };
  }

  async subscribeMembers(subscribeToMore) {
    subscribeToMore({
      document: GET_NEW_MEMBER,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("fff", subscriptionData);
        if (!subscriptionData.data) return prev;
        const newMember = subscriptionData.data.newMember;
        return Object.assign({}, prev, {
          getCommunity: {
            users: [newMember, ...prev.users],
            __typename: prev.feed.__typename
          }
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Query query={GET_COMMUNITY} variables={this.state}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Loading</div>;
            if (error) return console.log(error);
            this.subscribeMembers(subscribeToMore);
            const {
              name,
              privacy,
              about,
              id,
              owner,
              users,
              slug,
              hasPosts,
              hasMessages
            } = data.getCommunity;

            return (
              <ParseCommunityQuery
                name={name}
                privacy={privacy}
                about={about}
                id={id}
                slug={slug}
                hasMessages={hasMessages}
                hasPosts={hasPosts}
                users={users}
                owner={owner}
              />
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withRouter(Community);
