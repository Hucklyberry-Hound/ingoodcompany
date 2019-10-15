import React from 'react';
import { AUTH_TOKEN } from '../constants';

export default class HomePage extends React.Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div>
        {authToken
          ? this.props.history.push('/home')
          : this.props.history.push('/login')}
        <h1>Welcome to In Good Company!</h1>
      </div>
    );
  }
}
