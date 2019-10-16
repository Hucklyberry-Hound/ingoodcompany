import React, { Component } from 'react';
import { AUTH_TOKEN, USER } from '../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../styles/Login.css';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $username: String!
    $image: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      username: $username
      image: $image
    ) {
      token
      user {
        id
        username
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;



class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      image: '',
      username: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // document.getElementsByClassName("login-box").style.height = "650px";
    this.setState({ login: !this.state.login });
  }

  render() {
    const { login } = this.state;

    return (
      <div className="login-page">
        <div className="login-welcome-message">
          <h4>Welcome to In Good Company!</h4>
          <p>A place to build your own community of like-minded people</p>
          <p>Sign Up or Login to Start!</p>
        </div>
        <div className="login-box">
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
                 <input
                  value={this.state.image}
                  onChange={e => this.setState({ image: e.target.value })}
                  type="text"
                  placeholder="(Optional) Image URL"
                />
              </div>
            )}
            <input
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Email Address"
            />
            <input
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={this.state}
              onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                <button onClick={mutation}>
                  {' '}
                  {login ? 'login' : 'create account'}{' '}
                </button>
              )}
            </Mutation>
            <button onClick={this.handleClick}>
              {login
                ? 'need to create an account?'
                : 'already have an account?'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  _confirm = async data => {
    const { token, user } = this.state.login ? data.login : data.signup;
    this._saveUserData(token, user.username);
    this.props.history.push(`/home`);
  };

  //Save user data in local storage
  _saveUserData = (token, username) => {
    console.dir(username);
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER, username);
  };
}

export default Login;
