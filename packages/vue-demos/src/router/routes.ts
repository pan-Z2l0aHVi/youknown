import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/page_list'
	},
	{
		path: '/page_list',
		name: 'page_list',
		component: () => import('@/views/PageListView.vue')
	},
	{
		path: '/hello',
		name: 'hello',
		component: () => import('@/views/HelloWorldView.vue')
	},
	{
		path: '/editor',
		name: 'editor',
		component: () => import('@/views/RichTextEditorView.vue')
	},
	{
		path: '/crypto',
		name: 'crypto',
		component: () => import('@/views/CryptoView.vue')
	},
	{
		path: '/tab_bar',
		name: 'tab_bar',
		component: () => import('@/views/TabBarView.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/'
	}
]
