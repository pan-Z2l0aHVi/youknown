import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import http2Proxy from 'vite-plugin-http2-proxy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
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
      vue(),
      AutoImport({
        dts: true,
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.js',
          globalsPropValue: true
        },
        imports: ['vue']
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      Unocss(),
      visualizer({
        filename: 'stats.html',
        gzipSize: true,
        open: false
      })
    ],
    build: {
      target: 'es2017'
    },
    worker: {
      format: 'es'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
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
