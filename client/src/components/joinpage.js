import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

const ADD_USER = gql`
  mutation AddUserToCommunity($communityId: String!) {
    addUserToCommunity(communityId: $communityId) {
      id
    }
  }
`;

class JoinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.slug,
      communityId: props.communityId
    };
  }

  render() {
    const { slug, communityId } = this.state;
    return (
      <div>
        <Mutation
          mutation={ADD_USER}
          variables={{ communityId }}
          onCompleted={post => {
            this.props.history.push({
              pathname: `/community/${slug}`,
              state: { isNowMember: true }
            });
          }}
        >
          {mutation => <button onClick={mutation}>Click Here to Join!</button>}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(JoinPage);
