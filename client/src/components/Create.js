import React, { useContext } from 'react';
import { useInput } from './SignUp'
import { NotesContext } from '../context/NotesContex'

function Create() {
  const title = useInput('');
  const body = useInput('');
  const time = useInput('30 seconds');
  const { createNotes } = useContext(NotesContext)
  return (
    <div>
      <h1 className="text-center">Create a Note</h1>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input {...title} type='text' name='title' className='form-control' placeholder='Enter a title' />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea {...body} name='body' className='form-control' placeholder='Fill your notes here' />
        </div>
        <div className="form-group">
          <label>Select Reminder Time</label>
          <select {...time} name='body' className='form-control' placeholder='Select a duration'>
            <option value='30 seconds'>30 Seconds</option>
            <option value='one hour'>1 Hour</option>
            <option value='1 day'>1 Day</option>
            <option value='1 week'>1 Week</option>
          </select>
        </div>
        <div className="form-group">
          <button onClick={(e) => {
            e.preventDefault()
            createNotes(title.value, body.value, time.value)
          }} className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create
