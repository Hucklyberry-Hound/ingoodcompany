import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends React.Component {
    render() {
        return (
              <div >
                  <Link to="/">
                      All Posts!
                  </Link>
              <Link to="/login" >
                Login Here!
              </Link>
              <Link to="/create" >
                submit
              </Link>
              </div>
 
        )
    }
}


export default withRouter(Header);
