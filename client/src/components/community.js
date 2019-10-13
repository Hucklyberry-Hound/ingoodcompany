import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ParseCommunityQuery from "./parsecommunityquery";
import { withRouter } from "react-router-dom";

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

  render() {
    return (
      <React.Fragment>
        <Query query={GET_COMMUNITY} variables={this.state}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Loading</div>;
            if (error) return console.log(error);
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
