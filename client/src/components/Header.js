import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN, USER } from '../constants';

class Header extends React.Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const user = localStorage.getItem(USER);
    return (
      <div>
        <div>
          {authToken ? (
            <div>
              <h4>You are logged in as {user}</h4>
              <Link>
                <div
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    this.props.history.push(`/`);
                  }}
                >
                  {' '}
                  logout
                </div>
              </Link>
            </div>
          ) : (
            <Link to="/login"> login/create account </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
