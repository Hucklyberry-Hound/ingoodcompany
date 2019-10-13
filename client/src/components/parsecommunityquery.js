import React from "react";
import { withRouter } from "react-router-dom";
import { USER } from "../constants";
import CustomCommunity from "./CustomCommunity";
import JoinPage from "./joinpage";

const ParseCommunityQuery = props => {
  const thisUser = localStorage.getItem(USER);
  const isNowMember = props.location.state
    ? props.location.state.isNowMember
    : null;
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

  return owner.username === thisUser ||
    isNowMember ||
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
    <JoinPage slug={slug} communityId={id} />
  );
};

export default withRouter(ParseCommunityQuery);
