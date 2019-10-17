import About from './about';
import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { GET_USER } from './user';
import { GET_COMMUNITIES } from './profilepage';
import { GET_POSTS } from './posts';
import { USER } from '../constants'

const ADD_USER = gql`
  mutation AddUserToCommunity($communityId: String!) {
    addUserToCommunity(communityId: $communityId) {
      id
      username
    }
  }
`;

class JoinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      communityId: props.communityId,
    };
  }
  render() {
    const { about, name } = this.props;
    const { communityId, updateParent } = this.state;
    const username = localStorage.getItem(USER)
    return (
      <div className="community-container">
        <About info={about} name={name} />
        <Mutation
          mutation={ADD_USER}
          variables={{ communityId }}
          // update={(store, { data: { addUserToCommunity } }) => {
          //   let data = store.readQuery({
          //     query: GET_COMMUNITY,
          //     variables: { slug: this.props.slug }
          //   });
          //   data.getCommunity.users = [
          //     ...data.getCommunity.users,
          //     addUserToCommunity
          //   ];
          //   store.writeQuery({
          //     query: GET_COMMUNITY,
          //     data
          //   });
          //   return data;
          // }}
          onCompleted={mutation => {
            const newMember = mutation.addUserToCommunity;
            this.props.updateParent(newMember);
          }}
          refetchQueries={() => {
            return [
              {
                query: GET_COMMUNITIES
              },
              {
                query: GET_USER,
                variables: { username }
              },
              {
                query: GET_POSTS

              }
            ];
          }}
        >
          {mutation => (
            <Box p={3}>
              <Button
                p={10}
                variant="contained"
                color="primary"
                onClick={mutation}
              >
                Click Here to Join!
              </Button>
            </Box>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(JoinPage);
