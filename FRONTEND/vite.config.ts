import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
    server: {
    host: true,
    port: 8000,
    watch: {
      usePolling: true, // Add this if you're on Windows
    },
  },
})
