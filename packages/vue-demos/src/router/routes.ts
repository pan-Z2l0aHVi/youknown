import { RouteRecordRaw } from 'vue-router'

export const navTabRoutes: (RouteRecordRaw & {
	meta: {
		title: string
	}
})[] = [
	{
		path: '/page_list',
		name: 'page_list',
		component: () => import('@/views/page-list/index.vue'),
		meta: {
			title: 'Page List'
		}
	},
	{
		path: '/upload',
		name: 'upload',
		component: () => import('@/views/upload/index.vue'),
		meta: {
			title: 'Upload'
		}
	},
	{
		path: '/editor',
		name: 'editor',
		component: () => import('@/views/rich-text-editor/index.vue'),
		meta: {
			title: 'Editor'
		}
	},
	{
		path: '/crypto',
		name: 'crypto',
		component: () => import('@/views/crypto/index.vue'),
		meta: {
			title: 'Crypto'
		}
	},
	{
		path: '/tab_bar',
		name: 'tab_bar',
		component: () => import('@/views/tab-bar/index.vue'),
		meta: {
			title: 'TabBar'
		}
	}
]

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/page_list'
	},
	...navTabRoutes,
	{
		path: '/:pathMatch(.*)*',
		redirect: '/'
	}
]
