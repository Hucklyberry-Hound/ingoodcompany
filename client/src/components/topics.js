import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import '../styles/Topic.css';
import '../styles/Loading.css';


const FILTER_COMMUNITY = gql`
  query FilterCommunity($filter: String!) {
    communities(filter: $filter) {
      id
      category
      name
      slug
    }
  }
`;

const TopicsPage = props => {
  const { category } = props.match.params;

  return (
    <React.Fragment>
      <h1>Communities about {category}</h1>
      <Query query={FILTER_COMMUNITY} variables={{ filter: category }}>
        {({ loading, error, data }) => {
          if (loading) return <div className='loader-container'><div className="loader"></div></div>;
          if (error) console.log(error);
          const { communities } = data;
          return (
            <div className="all-topics">
              {communities.map(community => {
                return (
                  <div className="single-topic">
                    <Link to={`/community/${community.slug}`}>
                      {community.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default TopicsPage;
