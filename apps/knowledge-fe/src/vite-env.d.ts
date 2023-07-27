/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PROXY_URL: string
	readonly VITE_CDN_URL: string
	readonly VITE_GITHUB_CLIENT_ID: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
