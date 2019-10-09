import React from 'react';
import ColumnData from './profilecolumn';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_POSTS = gql`
  {
    communities {
      name
      category
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
      <div className="profile-container">
        <ColumnData
          headerText="Communities You Own"
          listData={this.state.owned}
        />
        <ColumnData
          headerText="Communities You're Subscribed To"
          listData={this.state.belongTo}
        />
        <Query query={GET_POSTS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading</div>;
            if (error) console.log(error);
            return (
              <ColumnData
                headerText="Public Communities"
                listData={this.state.public}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}
