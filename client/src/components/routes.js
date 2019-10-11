import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { login, HomePage, Profile, Community, CreatePage, createPostForm } from '.';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={login} />
        <Route path="/home" component={Profile} />
        <Route path="/create" component={CreatePage} />
        <Route path="/community/:community" component={Community} />
        <Route path="/community/:community/posts/create" component={createPostForm} />
        <Route component={HomePage} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
