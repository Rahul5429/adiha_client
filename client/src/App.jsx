import React, { useContext } from 'react'
import Navbar from './components/Navbar.jsx'
import AuthForm from './components/AuthForm.jsx'
import TaskList from './components/TaskList.jsx'
import { AuthProvider, AuthContext } from './context/AuthContext.jsx'

function InnerApp() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <Navbar />
      <main className="container">
        {!user ? <AuthForm /> : <TaskList />}
      </main>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}
