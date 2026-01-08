import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src/renderer/src'),
        '@shared': resolve(__dirname, './src/shared'),
        '@server': resolve(__dirname, './src/server')
      }
    },
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true
      }),
      react({
        babel: { plugins: [['babel-plugin-react-compiler']] }
      }),
      tailwindcss(),
      devtools()
    ]
  }
})
