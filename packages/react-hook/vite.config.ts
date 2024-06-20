import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import styleInject from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  base: '',
  plugins: [react(), styleInject()],
  build: {
    target: 'es2015',
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'main',
      fileName: format => `main.${format}.js`
    },
    rollupOptions: {
      plugins: [],
      external: ['react', 'react-dom']
    }
  }
})
