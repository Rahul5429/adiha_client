import axios from 'axios'
import { getToken } from '../services/tokenService.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://adiha-server.onrender.com/api',
  withCredentials: false
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
