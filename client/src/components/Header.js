import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import {AUTH_TOKEN } from '../constants'



class Header extends React.Component {

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        return (
        <div >
            <Link to="/"> All Posts! </Link>
        <div>
        {authToken ? (
          <Link><div onClick={() => {
              localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push(`/`)
            }}
          > logout</div></Link>) : (
          <Link to="/login"> login/create account </Link>
        )}
        </div>
        
        </div>
        )
    }
}


export default withRouter(Header);
