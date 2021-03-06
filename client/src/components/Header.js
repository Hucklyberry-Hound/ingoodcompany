import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN, USER } from '../constants';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ show: !this.state.show });
    document
      .getElementsByClassName('loggedin-header-bar')[0]
      .classList.toggle('loggedin-header-bar-active');
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const user = localStorage.getItem(USER);
    return (
      <div className="header-bar">
        {authToken ? (
          <div className="burger">
            <i
              className="fa fa-bars"
              aria-hidden="true"
              onClick={() => this.toggleMenu()}
            ></i>
          </div>
        ) : (
          ''
        )}
        <div>
          <div className="loggedin-header-bar">
            {this.state.show ? (
              <React.Fragment>
                <div className="close">
                  <i
                    className="fa fa-window-close"
                    aria-hidden="true"
                    onClick={() => this.toggleMenu()}
                  ></i>
                </div>
                <h4 className="welcome-header-bar">Welcome {user}!</h4>
                <div className="links-header-bar">
                  <Link className="element-header-bar" to="/home">
                    <div>home</div>
                  </Link>

                  <Link className="element-header-bar" to="/create">
                    <div>create</div>
                  </Link>

                  <Link className="element-header-bar" to={`/user/${user}`}>
                    <div>profile</div>
                  </Link>

                  <Link className="element-header-bar-logout" to="/">
                    <div
                      onClick={() => {
                        localStorage.removeItem(AUTH_TOKEN);
                        localStorage.removeItem(USER);
                        this.toggleMenu();
                        this.props.history.push(`/login`);
                      }}
                    >
                      logout
                    </div>
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
