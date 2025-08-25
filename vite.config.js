import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    port: 4000,
    allowedHosts: ['3c1ba7f2061d.ngrok-free.app'],
  },
  plugins: [react(), tailwindcss()],
})
