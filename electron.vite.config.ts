import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      externalizeDeps: {
        exclude: ['elysia']
      },
      rollupOptions: {
        external: ['sharp']
      }
    }
  },
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@shared-types': resolve('src/shared-types'),
        '@server': resolve('src/server')
      }
    },
    plugins: [
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      tailwindcss(),
      devtools(),
      react({ babel: { plugins: ['babel-plugin-react-compiler'] } })
    ]
  }
})
