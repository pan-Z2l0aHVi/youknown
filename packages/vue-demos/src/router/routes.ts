import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/page_list'
	},
	{
		path: '/page_list',
		name: 'page_list',
		component: () => import('@/views/PageList.vue')
	},
	{
		path: '/hello',
		name: 'hello',
		component: () => import('@/views/HelloWorld.vue')
	},
	{
		path: '/editor',
		name: 'editor',
		component: () => import('@/views/RichTextEditor.vue')
	},
	{
		path: '/tab_bar',
		name: 'tab_bar',
		component: () => import('@/views/TabBar.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/'
	}
]
