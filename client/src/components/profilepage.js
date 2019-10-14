import React from 'react';
import ColumnData from './profilecolumn';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { USER } from '../constants';
import '../styles/ProfilePage.css';

const GET_COMMUNITIES = gql`
  {
    communities {
      id
      name
      category
      privacy
      slug
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

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['Animals', 'Computers', 'Food', 'Chair'],
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
          const owned = communities.filter(c => c.owner.username === username);
          const belongsTo = communities.filter(c =>
            c.users.map(u => u.username).includes(username)
          );
          const publicCommunities = communities.filter(
            c => c.privacy.toLowerCase() === 'public'
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
              <div className="column">
                <h2>Find Communities By Topic</h2>
                {this.state.categories.map((cat, index) => {
                  return (
                    <div className="column column-li" key={index}>
                      <Link to={`/category/${cat}`}>{cat}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
