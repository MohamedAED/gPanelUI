import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/gPanel': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Optional: removes /api from the start if your backend 
        // doesn't use that prefix: rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
