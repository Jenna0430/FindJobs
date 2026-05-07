import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    fs: {
      // Allow Vite to serve files from the monorepo root
      allow: ['../../'] 
    }
  },
  resolve: {
    alias: {
      "@findjobs/shared-ui": path.resolve(__dirname, "../shared-ui"),
    }}
});
