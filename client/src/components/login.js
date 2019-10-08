import React from 'react';
import FormField from './formfield';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
  }

  handleUsernameOnChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordOnChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Sign In To Your Account</h1>
        <form name="login">
          <FormField
            labelText="Username"
            fieldType="username"
            value={this.state.username}
            onChange={this.handleUsernameOnChange}
          />
          <FormField
            labelText="Password"
            fieldType="password"
            value={this.state.password}
            onChange={this.handlePasswordOnChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
