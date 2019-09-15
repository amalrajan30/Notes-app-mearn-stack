import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SignIn from './SignedIn';
import SignedOut from './SignedOut';

function Header() {
  const link = sessionStorage.getItem('isTokenValid') ? <SignIn /> : <SignedOut />
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className="navbar-brand">
        Notes App
      </Link>
      {link}
    </nav>
  )
}

export default Header
