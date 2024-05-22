/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_PROXY_BASE_URL: string
  readonly VITE_CDN_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    transitionName?: string
  }
  interface RouteLocationNormalizedLoaded {
    name: string | null | undefined
  }
}
