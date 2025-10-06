import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use VITE_API_URL to point to server (e.g., http://localhost:5000)
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
})
