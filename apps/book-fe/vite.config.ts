import mdx from '@mdx-js/rollup'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { excludeDeps } from '@youknown/img-wasm'
import { resolve } from 'path'
import remarkGfm from 'remark-gfm'
import { visualizer } from 'rollup-plugin-visualizer'
import unocss from 'unocss/vite'
import type { PluginOption } from 'vite'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
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
      mdx({
        remarkPlugins: [remarkGfm]
      }),
      VitePWA({
        devOptions: {
          enabled: true
        },
        base: isBuild ? `${env.VITE_BASE_URL}/` : '',
        injectRegister: null,
        manifest: {
          name: 'Book',
          short_name: 'Book',
          description: 'document book',
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
      splitVendorChunkPlugin(),
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
      reportCompressedSize: false
    },
    server: {
      host: true,
      open: env.VITE_ROUTER_BASENAME,
      cors: true,
      https: true
    }
  }
})
