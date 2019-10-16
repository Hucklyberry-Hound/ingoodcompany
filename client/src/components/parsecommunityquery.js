import React from "react";
import { withRouter } from "react-router-dom";
import { USER } from "../constants";
import CustomCommunity from "./CustomCommunity";
import JoinPage from "./joinpage";

class ParseCommunityQuery extends React.Component {
  constructor(props) {
    super(props);
    const {
      name,
      about,
      id,
      owner,
      users,
      slug,
      hasPosts,
      hasMessages,
      privacy
    } = props;

    this.state = {
      name,
      about,
      id,
      owner,
      users,
      slug,
      hasPosts,
      hasMessages,
      privacy
    };

    this.updateMembers = this.updateMembers.bind(this);
  }

  updateMembers(newMember) {
    this.setState({ users: [...this.state.users, newMember] });
  }

  render() {
    const thisUser = localStorage.getItem(USER);
    const {
      name,
      about,
      id,
      owner,
      users,
      slug,
      hasPosts,
      hasMessages,
      privacy
    } = this.state;

    return owner.username === thisUser ||
      users.map(user => user.username).includes(thisUser) ? (
      <div className="community">
        <CustomCommunity
          name={name}
          privacy={privacy}
          about={about}
          id={id}
          slug={slug}
          hasMessages={hasMessages}
          hasPosts={hasPosts}
          users={users}
          owner={owner}
        />
      </div>
    ) : (
      <JoinPage
        communityId={id}
        slug={slug}
        updateParent={this.updateMembers}
      />
    );
  }
}

export default withRouter(ParseCommunityQuery);
