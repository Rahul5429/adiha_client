import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import Loader from './Loader.jsx'

export default function AuthForm() {
  const { login, signup, loading } = useContext(AuthContext)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  if (loading) return <Loader />

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') await login(form.email, form.password)
      else await signup(form.email, form.password)
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <section className="card auth-card">
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={onSubmit} className="form">
        <label>Email
          <input type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required />
        </label>
        <label>Password
          <input type="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            minLength={6} required />
        </label>
        {error && <div className="error">{error}</div>}
        <button className="btn primary" type="submit">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>
      <div className="switch">
        {mode === 'login' ? (
          <span>New here? <button type="button" className="link" onClick={() => setMode('signup')}>Sign up</button></span>
        ) : (
          <span>Already have an account? <button type="button" className="link" onClick={() => setMode('login')}>Login</button></span>
        )}
      </div>
    </section>
  )
}
