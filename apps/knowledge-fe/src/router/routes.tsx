import { createElement, lazy, ReactNode } from 'react'
import { LuWallpaper } from 'react-icons/lu'
import { TbBook2, TbHistory, TbLayout, TbNotes, TbStar } from 'react-icons/tb'
import { Navigate, RouteObject } from 'react-router-dom'

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
				element: createElement(lazy(() => import('@/views/browse')))
			},
			{
				path: 'feed-detail',
				element: createElement(lazy(() => import('@/views/feed-detail')))
			}
		]
	},
	{
		path: 'library',
		state: {
			nav_name: '我的知识库',
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
						element: createElement(lazy(() => import('@/views/doc-list')))
					},
					{
						path: 'doc-editor',
						element: createElement(lazy(() => import('@/views/doc-editor')))
					}
				]
			}
		]
	},
	{
		path: 'wallpapers',
		element: createElement(lazy(() => import('@/views/wallpapers'))),
		state: {
			nav_name: '壁纸',
			icon: <LuWallpaper />
		}
	},
	{
		path: 'favorites',
		element: createElement(lazy(() => import('@/views/favorites'))),
		state: {
			nav_name: '收藏夹',
			icon: <TbStar />
		}
	},
	{
		path: 'history',
		element: createElement(lazy(() => import('@/views/history'))),
		state: {
			nav_name: '历史记录',
			icon: <TbHistory />
		}
	}
]

const routes = [
	...nav_routes,
	{
		path: 'login-success',
		element: createElement(lazy(() => import('@/views/login-success')))
	},
	{
		path: '*',
		element: <Navigate to="browse" replace />
	}
]

export default routes
