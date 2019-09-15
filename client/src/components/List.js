import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../context/NotesContex";

function List(props) {
  const token = sessionStorage.getItem('isTokenValid');
  const { getNotes, notes, editNotes, deleteNotes } = useContext(NotesContext);
  const [manipuNotes, setManipuNotes] = useState({});
  useEffect(() => {
    token ? getNotes(token) : props.history.push('/loginHook')
  }, [token]);
  let notesRender = [];
  let counter = 0;

  notesRender = notes.map((item, arr) => {
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
                onClick={e => setManipuNotes({
                  title: item.title,
                  body: item.body,
                  id: item._id
                })}
                className="btn btn-link"
                data-toggle="modal" data-target="#exampleModal">
                View Note
              </button>
            </li>
            <li className="list-group-item">
              <button
                onClick={e => setManipuNotes({
                  title: item.title,
                  body: item.body,
                  id: item._id
                })}
                data-toggle="modal" data-target="#editModal"
                className="btn btn-link">
                Edit Note
              </button>
            </li>
            <li className="list-group-item">
              <button
                onClick={e => setManipuNotes({
                  id: item._id
                })}
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
                <h5 className="modal-title" id="exampleModalLabel">{manipuNotes.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {manipuNotes.body}
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
                <button type="button" className="btn btn-danger" onClick={() => deleteNotes(manipuNotes.id)} data-dismiss="modal">Yes</button>
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
                    <input type='text' id='title' name='title' className='form-control' onChange={e => setManipuNotes({ ...manipuNotes, title: e.target.value })} value={manipuNotes.title} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='body'>Edit Body</label>
                    <textarea type='text' id='body' name='body' className='form-control' rows='6' onChange={e => setManipuNotes({ ...manipuNotes, body: e.target.value })} value={manipuNotes.body} ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className='btn btn-primary' onClick={() => editNotes(manipuNotes)} data-dismiss="modal">Save</button>
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
      {notesRender}
    </div>
  )
}

export default List;
