import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN, USER } from '../constants';
import '../styles/Header.css'

class Header extends React.Component {
  
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const user = localStorage.getItem(USER);
    return (
      <div className ="header-bar">
        <div >
          {authToken ? (
            <div className="loggedin-header-bar">
              <h4 className="welcome-header-bar">Welcome {user}!</h4>
              <div className="links-header-bar">

              <Link className="element-header-bar" to="/home">
              <div >home</div>
              </Link>

              <Link className="element-header-bar" to="/create">
              <div >create a community</div>
              </Link>

            
              <Link className="element-header-bar" to={`/user/${user}`} >
                <div >profile</div>
              </Link>

              <Link className="element-header-bar-logout" to="/">
                <div 
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    localStorage.removeItem(USER);
                    this.props.history.push(`/login`);
                  }}
                >
                  logout
                </div>
              </Link> 

              </div>
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
