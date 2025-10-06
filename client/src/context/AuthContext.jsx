import React, { createContext, useEffect, useState } from 'react'
import api from '../api/axios.js'
import { getToken, setToken, clearToken } from '../services/tokenService.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) { setLoading(false); return }
    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => clearToken())
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
  }

  const signup = async (email, password) => {
    const { data } = await api.post('/auth/signup', { email, password })
    setToken(data.token)
    setUser(data.user)
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
