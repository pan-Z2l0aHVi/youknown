import mdx from '@mdx-js/rollup'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { excludeDeps } from '@youknown/img-wasm'
import { dirname, resolve } from 'path'
import remarkGfm from 'remark-gfm'
import { visualizer } from 'rollup-plugin-visualizer'
import unocss from 'unocss/vite'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import http2Proxy from 'vite-plugin-http2-proxy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: '/',
    plugins: [
      basicSsl(),
      http2Proxy({
        '/proxy': {
          target: env.VITE_LOCAL_PROXY_BASE_URL,
          secure: false,
          rewrite: path => path.replace(/^\/proxy/, ''),
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      }),
      mdx({
        remarkPlugins: [remarkGfm]
      }),
      react(),
      unocss(),
      visualizer({
        filename: 'stats.html',
        gzipSize: true
      })
    ],
    optimizeDeps: {
      exclude: [...excludeDeps]
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: {
      target: 'es2017'
    },
    server: {
      host: true,
      open: true,
      cors: true,
      fs: {
        allow: ['..']
      }
    },
    css: {
      preprocessorOptions: {
        scss: {}
      }
    }
  }
})
