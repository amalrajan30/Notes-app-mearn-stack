import React, { Component } from "react";
import { connect } from 'react-redux'
import { getData, deleteData, saveToken } from '../actions'
import { editData } from '../actions'
import { Redirect } from 'react-router-dom'
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      id: ''
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  onClick = (e, title, body, id) => {
    this.setState({
      id: id,
      title: title,
      body: body
    })
  }

  onClickEdit = (e, id, title, body) => {
    this.setState({
      title: title,
      body: body,
      id: id
    })
  }

  editSubmit = (e) => {
    e.preventDefault();
    const data = {
      _id: this.state.id,
      title: this.state.title,
      body: this.state.body,
      token: this.props.auth.auth.token
    }
    this.props.editData(data)
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    let data = {
      id: id,
      token: this.props.auth.token
    }
    this.props.deleteData(data)
  }

  componentDidMount() {
    if (this.props.auth.token) {
      this.props.getData(this.props.auth.token)
      this.props.saveToken()
    }
  }


  render() {
    if (!this.props.auth.token) {
      return (
        <Redirect to='/login' />
      )
    }
    if (this.props.notes.notes.length === 0) {
      return (
        <h3 className="text-center">No Notes Available....</h3>
      )
    }
    let notes = [];
    let counter = 0;
    notes = this.props.notes.notes.map((item, arr) => {
      counter++
      return (
        <div key={arr} className="card-columns" id="cards">
          <div className="card w-25 m-3">
            <div className="card-header">
              {counter}) {item.title}
            </div>
            <div className="card-body">
              <h5>{item.body}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <button
                  onClick={e => this.onClick(e, item.title, item.body, item._id)}
                  className="btn btn-link"
                  data-toggle="modal" data-target="#exampleModal">
                  View Note
              </button>
              </li>
              <li className="list-group-item">
                <button
                  onClick={e => this.onClickEdit(e, item._id, item.title, item.body)}
                  data-toggle="modal" data-target="#editModal"
                  className="btn btn-link">
                  Edit Note
              </button>
              </li>
              <li className="list-group-item">
                <button
                  onClick={e => this.onClick(e, item.title, item.body, item._id)}
                  className="btn btn-link"
                  data-toggle="modal" data-target="#deleteConfirm"
                >
                  Delete Note
              </button>
              </li>
            </ul>
          </div>
          {/* <-------- View Model ----------> */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{this.state.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.body}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          {/* <-------- Delete Model ----------> */}
          <div className="modal fade" id="deleteConfirm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h4>Do you want to delete this note?</h4>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={e => this.handleDelete(e, this.state.id)} className="btn btn-danger" data-dismiss="modal">Yes</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                </div>
              </div>
            </div>
          </div>
          {/* <-------- Edit Model ----------> */}
          <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="editModal">Edit the Modal</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className='form-group'>
                      <label htmlFor='title'>Edit the Title</label>
                      <input type='text' id='title' onChange={e => this.handleChange(e, this.state.title)} name='title' className='form-control' value={this.state.title} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='body'>Edit Body</label>
                      <textarea type='text' onChange={e => this.handleChange(e, this.state.body)} id='body' name='body' className='form-control' rows='6' value={this.state.body}></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className='btn btn-primary' data-dismiss="modal" onClick={e => this.editSubmit(e)}>Save</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1 className="text-center">Lists of Notes</h1>
        {notes}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  getData: (token) => dispatch(getData(token)),
  deleteData: (data) => dispatch(deleteData(data)),
  editData: (data) => dispatch(editData(data)),
  saveToken: () => dispatch(saveToken())
})


export default connect(mapStateToProps, mapDispatchToProps)(List);