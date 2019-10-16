import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
      <div class="category-communities">
        <div class="category-communities-box">
          <h1>Communities about {category}</h1>
          <Query query={FILTER_COMMUNITY} variables={{ filter: category }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading</div>;
              if (error) console.log(error);
              const { communities } = data;
              return (
                <ul>
                  {communities.map(community => {
                    return (
                      <li>
                        <Link to={`/community/${community.slug}`}>
                          {community.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );
            }}
          </Query>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopicsPage;
