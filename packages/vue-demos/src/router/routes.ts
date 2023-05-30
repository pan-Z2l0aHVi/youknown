import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/page_list'
	},
	{
		path: '/page_list',
		name: 'page_list',
		component: () => import('@/components/PageList.vue')
	},
	{
		path: '/hello',
		name: 'hello',
		component: () => import('@/components/HelloWorld.vue')
	},
	{
		path: '/editor',
		name: 'editor',
		component: () => import('@/components/RichTextEditor.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/'
	}
]
