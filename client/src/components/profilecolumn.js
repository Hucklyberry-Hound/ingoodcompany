import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProfileColumn.css";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {GET_COMMUNITIES} from './profilepage';



const DELETE_COMMUNITY = gql`
  mutation DeleteCommunity(
    $communityId: String!
  ) {
    deleteCommunity(
      communityId: $communityId
    ) {
      id
      name
    }
  }
`;


const ColumnData = props => {
  const { headerText, listData } = props;
  return listData.length ? (
    <div className="column">
      <h2>{headerText}</h2>
      {listData.map((community, index) => {
        const communityId = community.id
        return (
          <div className="column column-li" key={index} style={{background: props.color}}>
            <Link to={`/community/${community.slug}`}>
              <h5>{community.name}</h5>
            </Link>
            <Link to={`/category/${community.category}`}>
              <br></br>
              <small>Category: {community.category}</small>
            </Link>
            <br />
            <small>{community.users.length + 1} Members</small>
            {(headerText === "Owned by you") ? 
            <Mutation 
            mutation={DELETE_COMMUNITY}
            variables={{communityId: communityId}}
            refetchQueries={() => {
              return [
                {
                  query: GET_COMMUNITIES,
                }
              ];
            }}
            >
           {deleteMutation => (
              <button 
              className="delete-community"
              onClick={deleteMutation}
            >
              Delete
            </button>
           )}
            </Mutation>
            : ''}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="column">
      <h2>{headerText}</h2>
      <p>Empty</p>
    </div>
  );
};

export default ColumnData;
