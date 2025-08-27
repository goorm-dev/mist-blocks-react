import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: true,
	allowedHosts: ['ktcloud-techup.ap-northeast-2.arkain.site'],
  },
  plugins: [react(), tailwindcss()],
})
