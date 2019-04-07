import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut, clearToken } from '../actions'

class SignIn extends Component {
  onLogout = () => {
    this.props.logOut()
    this.props.clearToken()
    window.location.reload()
  }
  render() {
    return (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link to='/lists' className="nav-link">
            Lists
      </Link>
        </li>
        <li className="nav-item">
          <Link to='/create' className="nav-link">
            Create
      </Link>
        </li>
        <li className="nav-item">
          <button onClick={this.onLogout} className="btn btn-link">
            LogOut
      </button>
        </li>
      </ul>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    clearToken: () => dispatch(clearToken())
  }
}

export default connect(null, mapDispatchToProps)(SignIn)