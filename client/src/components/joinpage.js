import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { GET_COMMUNITIES } from "./profilepage"
import About from "./about"

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
      updateParent: props.updateParent
    };
  }
  render() {
    const { about, name } = this.props
    const { communityId, updateParent } = this.state;
    return (
      <div>
        <About info={about} name={name} />
        <Mutation
          mutation={ADD_USER}
          variables={{ communityId }}
          onCompleted={mutation => {
            const newMember = mutation.addUserToCommunity;
            updateParent(newMember);
          }}
          refetchQueries={() => {
            return [{
              query: GET_COMMUNITIES
            }];
          }}
        >
          {mutation => <button onClick={mutation} >Click Here to Join!</button>}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(JoinPage);
