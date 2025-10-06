import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  return (
    <header className="navbar">
      <div className="brand">Task Manager</div>
      <nav>
        {user && (
          <div className="userbar">
            <span className="user-email">{user.email}</span>
            <button className="btn" onClick={logout}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  )
}
