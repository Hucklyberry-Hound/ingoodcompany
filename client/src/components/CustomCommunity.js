import React from "react";
import About from "./about";
import Posts from "./posts";
import Thread from "./thread";
import Members from "./memberlist";
import Events from './Events';
import { Link, Route, Switch } from "react-router-dom";

import "../styles/CustomCommunity.css"

const CustomCommunity = props => {
  const {
    slug,
    about,
    name,
    id,
    posts,
    hasPosts,
    hasMessages,
    hasEvents,
    users,
    owner
  } = props;

  return (
    <React.Fragment>
      <div className="community-header">
        <div>
        <Link to={`/community/${slug}/about`}>About</Link> </div>
        <div>
        <Link to={`/community/${slug}/members`}>Members</Link> </div>
        <div>
        {hasPosts ? <Link to={`/community/${slug}/posts`}>Posts</Link> : ""} </div>
        <div>{hasMessages ? (
          <Link to={`/community/${slug}/messages`}>Messages</Link>
        ) : (
          ""
        )}</div>
        <div>{hasEvents ? (
          <Link to={`/community/${slug}/events`}>Events</Link>
        ) : (
          ""
        )}
        </div>
      </div>

      <div className="community-container">
        <Switch>
          {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
          <Route
            path="/community/:community/about"
            render={props => <About {...props} info={about} name={name} />}
          />
          <Route
            path="/community/:community/posts"
            render={props => (
              <Posts {...props} posts={posts} communityId={id} slug={slug} />
            )}
          />
          <Route
            path="/community/:community/members"
            render={props => (
              <Members
                {...props}
                users={users}
                communityName={name}
                owner={owner}
              />
            )}
          />
          <Route
            path="/community/:community/thread/:postId"
            component={Thread}
          />

           <Route 
          exact path="/community/:community/events"
          render={props => <Events {...props} communityId={id} slug={slug} />}
          />

          <Route
            render={props => <Posts {...props} communityId={id} slug={slug} />}
          />

        </Switch>
      </div>
    </React.Fragment>
  );
};

export default CustomCommunity;
