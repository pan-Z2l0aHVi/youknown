import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import styleInject from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  base: '',
  plugins: [vue(), react(), styleInject(), Unocss()],
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
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  }
})
