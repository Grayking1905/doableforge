import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    watch: {
      ignored: ['**/*.zip', '**/backend/**'],
    },
  },
  build: {
    // Target modern browsers for smaller, faster bundles
    target: 'es2020',
    // Chunk size warning threshold
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunks: split Three.js & react-three-fiber away from main bundle
        // so mobile users who don't scroll to ForgeUniverse don't download it
        manualChunks: (id) => {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
