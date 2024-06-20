import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import http2Proxy from 'vite-plugin-http2-proxy'

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
      Unocss(),
      visualizer() as unknown as PluginOption
    ],
    build: {
      target: 'es2015'
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
      cors: true
    }
  }
})
