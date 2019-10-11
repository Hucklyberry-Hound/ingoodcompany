import React from 'react';
import About from './about';
import Posts from './posts';
import Thread from './thread';
import { Link, Route, Switch } from 'react-router-dom';

const CustomCommunity = props => {
  const { slug, about, name, id, posts, hasPosts, hasMessages } = props;

  return (
    <React.Fragment>
      <div className="community-header">
        <Link to={`/community/${slug}/about`}>About</Link>
        {hasPosts ? <Link to={`/community/${slug}/posts`}>Posts</Link> : ''}
        {hasMessages ? (
          <Link to={`/community/${slug}/messages`}>Messages</Link>
        ) : (
          ''
        )}
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
            path="/community/:community/thread/:postId"
            component={Thread}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default CustomCommunity;
