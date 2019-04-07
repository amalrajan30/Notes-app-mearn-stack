import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../actions'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSignUp = (e) => {
        e.preventDefault();
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signUp(data)
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
                        <label htmlFor="nameInput">Name</label>
                        <input type="text" id="name" onChange={this.handleChange} name='name' className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailInput">Email</label>
                        <input type="text" id="email" name='email' onChange={this.handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" id="password" name='password' onChange={this.handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="button" id="submit" onClick={this.onSignUp} className="form-control btn btn-success" value='Sign Up' />
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
    signUp: (data) => dispatch(signUp(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)