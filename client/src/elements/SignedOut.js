import React from 'react'
import { Link } from 'react-router-dom'

export default function SignedOut() {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link to='/loginHook' className="nav-link">
                    LogIn
      </Link>
            </li>
            <li className="nav-item">
                <Link to='/signup' className="nav-link">
                    SignUp
      </Link>
            </li>
        </ul>
    )
}
