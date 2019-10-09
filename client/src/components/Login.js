import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: ''
  }

  render() {
      const {login } = this.state;

    return (
      <div>
        <h4>{login ? 'Login' : 'Sign Up'}</h4>
        <div>
          {!login && (
              <div>
            <input
              value={this.state.firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
              type="text"
              placeholder="First Name"
            />
            <input
            value={this.state.name}
            onChange={e => this.setState({ lastName: e.target.value })}
            type="text"
            placeholder="Last Name"
          />
            <input
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Username"
          />
            </div>
          )}
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div >
          <button onClick={() => this._confirm()}>
            {login ? 'login' : 'create account'}
          </button>
          <button
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </button>
        </div>
      </div>
    )
  }

  _confirm = async () => {
    // ... you'll implement this 🔜
  }

  //Save user data in local storage
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login