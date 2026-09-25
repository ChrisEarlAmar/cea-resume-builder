import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative assets work for both https://<owner>.github.io/<repository>/ and custom domains.
  base: './',
  plugins: [react()],
})
