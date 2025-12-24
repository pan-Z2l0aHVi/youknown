import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { type UserConfig } from 'vite'
import styleInject from 'vite-plugin-css-injected-by-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  base: '',
  plugins: [
    react(),
    styleInject({
      topExecutionPriority: true
    })
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
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named'
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
