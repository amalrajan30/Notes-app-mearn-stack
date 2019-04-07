import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './SignedIn';
import SignedOut from './SignedOut';

class Header extends Component {
  render() {
    const link = this.props.auth.token ? <SignIn /> : <SignedOut />
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' className="navbar-brand">
          Notes App
      </Link>
        {link}
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header)