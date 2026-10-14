import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const backendEnv = loadEnv(mode, fileURLToPath(new URL('./server', import.meta.url)), 'PORT')
  const port = process.env.PORT || backendEnv.PORT || '5000'
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': { target: `http://127.0.0.1:${port}`, changeOrigin: true },
      },
    },
  }
})
