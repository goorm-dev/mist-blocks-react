import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['f1bf1c04352f.ngrok-free.app'],
  },
  plugins: [react(), tailwindcss()],
})
