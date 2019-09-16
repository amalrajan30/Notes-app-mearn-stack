import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

function SignedIn() {
  const { signOut } = useContext(LoginContext);
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
        <button onClick={() => signOut()} className="btn btn-link">
          LogOut
       </button>
      </li>
    </ul>
  )
}

export default SignedIn
