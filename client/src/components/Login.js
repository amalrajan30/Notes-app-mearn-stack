import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logIn, getData } from '../actions'
import { Redirect } from 'react-router'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogIn = (e) => {
        e.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.logIn(data)
    }


    render() {
        if (this.props.auth.token) {
            return (
                <Redirect to='/lists' />
            )
        }
        return (
            <div className="container mt-5 p-5">
                <form>
                    <div className="form-group">
                        <label htmlFor="emailInput">Email</label>
                        <input type="text" onChange={this.handleChange} name='email' className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" onChange={this.handleChange} name='password' className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" onClick={this.onLogIn} className="form-control btn btn-success" value='Log In' />
                    </div>
                    <div className="text-center text-danger">
                        {this.props.auth.auth.msg ? <p>{this.props.auth.auth.msg}</p> : null}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getData: (token) => dispatch(getData(token)),
    logIn: (data) => dispatch(logIn(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)