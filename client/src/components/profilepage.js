import React from "react";
import ColumnData from "./profilecolumn";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { USER } from "../constants";

const GET_COMMUNITIES = gql`
  {
    communities {
      id
      name
      category
      privacy
      slug
      users {
        id
        username
      }
      owner {
        id
        username
      }
      users {
        username
      }
    }
  }
`;

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owned: ["Cats", "Dog People"],
      belongTo: ["Cat People", "People who like umbrellas"],
      public: ["I need to buy cups", "Computers"]
    };
  }

  render() {
    const username = localStorage.getItem(USER);
    return (
      <Query query={GET_COMMUNITIES}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) console.log(error);
          const { communities } = data;
          const owned = communities.filter(
            c => c.owner.username === username /**=== currentUser.id) */
          );
          const belongsTo = communities.filter(c =>
            c.users.map(u => u.username).includes(username)
          );
          const publicCommunities = communities.filter(
            c => c.privacy === "Public"
          );
          return (
            <div className="profile-container">
              <ColumnData headerText="Communities You Own" listData={owned} />
              <ColumnData
                headerText="Communities You're Subscribed To"
                listData={belongsTo}
              />

              <ColumnData
                headerText="Public Communities"
                listData={publicCommunities}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
