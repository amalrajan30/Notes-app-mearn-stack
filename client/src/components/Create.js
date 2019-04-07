import React, { Component } from 'react'
import history from '../history'
import { createNote } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClick = (e, title, body) => {
    e.preventDefault();
    let data = {
      token: this.props.auth.auth.token,
      title: title,
      body: body
    }
    this.props.createNote(data)
    history.push('/lists')
  }
  render() {

    if (!this.props.auth.token) {
      return (
        <Redirect to='/login' />
      )
    }

    return (
      <div>
        <h1 className="text-center">Create a Note</h1>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input onChange={this.handleChange} type='text' name='title' className='form-control' placeholder='Enter a title' />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea onChange={this.handleChange} name='body' className='form-control' placeholder='Fill your notes here' />
          </div>
          <div className="form-group">
            <button onClick={(e) => this.handleClick(e, this.state.title, this.state.body)} className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

const mapDispatchToState = dispatch => {
  return {
    createNote: (data) => dispatch(createNote(data))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Create)