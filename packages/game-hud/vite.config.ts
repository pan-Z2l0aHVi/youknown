import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'path'
import Unocss from 'unocss/vite'
import { fileURLToPath } from 'url'
import { type UserConfig } from 'vite'
import styleInject from 'vite-plugin-css-injected-by-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  base: '',
  plugins: [
    vue(),
    react(),
    styleInject({
      topExecutionPriority: true
    }),
    Unocss()
  ],
  build: {
    target: 'esnext',
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'main',
      fileName: format => `main.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'vue'],
      output: {
        globals: {
          vue: 'Vue',
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
} satisfies UserConfig
