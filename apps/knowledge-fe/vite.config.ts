import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { excludeDeps } from '@youknown/img-wasm'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import unocss from 'unocss/vite'
import type { PluginOption } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import http2Proxy from 'vite-plugin-http2-proxy'
import { VitePWA } from 'vite-plugin-pwa'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const isBuild = command === 'build'
  return {
    base: isBuild ? env.VITE_CDN_BASE_URL : '',
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
      VitePWA({
        devOptions: {
          enabled: true
        },
        base: isBuild ? `${env.VITE_BASE_URL}/` : '',
        injectRegister: null,
        manifest: {
          name: 'Known',
          short_name: 'Known',
          description: 'knowledge base',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/branch.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }),
      topLevelAwait(),
      react(),
      unocss(),
      visualizer() as unknown as PluginOption
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
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-transition-group'],
            'i18next-vendor': ['i18next', 'react-i18next']
          }
        }
      }
    },
    worker: {
      format: 'es'
    },
    server: {
      host: true,
      open: true,
      cors: true
    }
  }
})
