import React from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Good Company!</h1>
        <div style={{ marginRight: 20 }}>
          <Link to="/login">Login</Link>
        </div>
        <Link to="/signup">Register</Link>
      </div>
    );
  }
}
