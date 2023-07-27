import { ReactNode } from 'react'
import { TbHistory, TbStar, TbNotes, TbLayout, TbBook2, TbWallpaper, TbDeviceDesktop } from 'react-icons/tb'
import { Navigate, RouteObject } from 'react-router-dom'
import { create_lazy_element } from './create-lazy-element'

export type RouteItem = RouteObject & {
	path: string
	state?: {
		nav_name: string
		icon: ReactNode
	}
	children?: RouteItem[]
}

export const nav_routes = [
	{
		path: 'browse',
		state: {
			nav_name: '浏览',
			icon: <TbLayout />
		},
		children: [
			{
				path: '',
				element: create_lazy_element(() => import('@/views/browse'))
			},
			{
				path: 'doc-detail',
				element: create_lazy_element(() => import('@/views/doc-detail'))
			}
		]
	},
	{
		path: 'library',
		state: {
			nav_name: '知识库',
			icon: <TbBook2 />
		},
		children: [
			{
				path: 'doc',
				state: {
					nav_name: '文档',
					icon: <TbNotes />
				},
				children: [
					{
						path: '',
						element: create_lazy_element(() => import('@/views/doc-list'))
					},
					{
						path: 'doc-editor',
						element: create_lazy_element(() => import('@/views/doc-editor'))
					}
				]
			}
		]
	},
	{
		path: 'wallpapers',
		element: create_lazy_element(() => import('@/views/wallpapers')),
		state: {
			nav_name: '壁纸',
			icon: <TbDeviceDesktop />
		}
	},
	{
		path: 'favorites',
		element: create_lazy_element(() => import('@/views/favorites')),
		state: {
			nav_name: '收藏夹',
			icon: <TbStar />
		}
	},
	{
		path: 'history',
		element: create_lazy_element(() => import('@/views/history')),
		state: {
			nav_name: '足迹',
			icon: <TbHistory />
		}
	}
]

const routes = [
	...nav_routes,
	{
		path: '*',
		element: <Navigate to="browse" replace />
	}
]

export default routes
