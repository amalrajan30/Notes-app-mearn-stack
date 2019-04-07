import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends Component {
  render() {
    if (this.props.auth.auth.token) {
      return (<Redirect to='/lists' />)
    }
    return (
      <div>
        <h2 className='text-center'>Login or Signup To Use The APP!</h2>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <Link to='/signup' className='text-center'>SignUp</Link>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Link to='/login' className='text-center'>SignIn</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(Home)