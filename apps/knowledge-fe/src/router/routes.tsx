import { createElement, lazy, ReactNode } from 'react'
import { TbBook2, TbHeart, TbHistory, TbLayout, TbPhotoSquareRounded } from 'react-icons/tb'
import { Navigate, RouteObject } from 'react-router-dom'

export type RouteItem = Omit<RouteObject, 'children'> & {
	path: string
	state?: {
		title?: string
		icon?: ReactNode
	}
	children?: RouteItem[]
}

const routes: RouteItem[] = [
	{
		path: 'browse',
		state: {
			title: '浏览',
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
			title: '我的知识库',
			icon: <TbBook2 />
		},
		element: createElement(lazy(() => import('@/views/library'))),
		children: [
			{
				path: ':space_id',
				children: [
					{
						path: '',
						element: createElement(lazy(() => import('@/views/space-detail')))
					},
					{
						path: 'editor',
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
			title: '壁纸',
			icon: <TbPhotoSquareRounded />
		}
	},
	{
		path: 'collection',
		element: createElement(lazy(() => import('@/views/collection'))),
		state: {
			title: '收藏夹',
			icon: <TbHeart />
		}
	},
	{
		path: 'history',
		element: createElement(lazy(() => import('@/views/history'))),
		state: {
			title: '历史记录',
			icon: <TbHistory />
		}
	},
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
