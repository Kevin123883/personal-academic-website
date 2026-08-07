import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // allow importing ../data/*.json (single source shared with the Next.js site + CV)
    fs: { allow: ['..'] },
  },
})
