import React from 'react';
import ColumnData from './profilecolumn';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_COMMUNITIES = gql`
  {
    communities {
      id
      name
      category
      privacy
      users {
        id
        username
      }
      owner {
        id
        username
      }
    }
  }
`;

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owned: ['Cats', 'Dog People'],
      belongTo: ['Cat People', 'People who like umbrellas'],
      public: ['I need to buy cups', 'Computers'],
    };
  }

  render() {
    return (
      <Query query={GET_COMMUNITIES}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) console.log(error);
          console.log(data);
          const { communities } = data;
          const owned = communities.filter(
            c => c.owner.id /**=== currentUser.id) */
          );
          // const belongsTo = communities.filter(c =>
          //   c.users.includes(currentUser.id)
          // );
          const belongsTo = [];
          const publicCommunities = communities.filter(
            c => c.privacy === 'Public'
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
