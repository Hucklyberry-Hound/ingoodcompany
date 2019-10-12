import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN, USER } from "../constants";

class Header extends React.Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const user = localStorage.getItem(USER);
    return (
      <div>
        <div>
          {authToken ? (
            <nav>
              <div>
                <h4>You are logged in as {user}</h4>
              </div>
              <div>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    localStorage.removeItem(USER);
                    this.props.history.push(`/`);
                  }}
                >
                  <p>Logout</p>
                </Link>
              </div>
              <div>
                <Link to="/create">
                  <p>create a community</p>
                </Link>
              </div>
            </nav>
          ) : (
            <Link to="/login"> login/create account </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
