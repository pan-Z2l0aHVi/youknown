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
import tsconfigPaths from 'vite-tsconfig-paths'

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
          rewrite: path => path.replace(/^\/proxy/, '')
        }
      }),
      mdx({
        remarkPlugins: [remarkGfm]
      }),
      splitVendorChunkPlugin(),
      tsconfigPaths(),
      react(),
      unocss(),
      visualizer() as PluginOption
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
      target: 'es2015'
    },
    server: {
      host: true,
      open: true,
      cors: true
    }
  }
})
