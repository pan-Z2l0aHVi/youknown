import { createElement, lazy, ReactNode } from 'react'
import { TbBook2, TbFolderHeart, TbHistory, TbLayout, TbPhotoSquareRounded } from 'react-icons/tb'
import { Navigate } from 'react-router-dom'

export interface RouteItem {
	path: string
	element?: ReactNode
	children?: RouteItem[]
	meta?: {
		title?: string
		icon?: ReactNode
	}
}

const routes: RouteItem[] = [
	{
		path: 'browse',
		meta: {
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
		meta: {
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
		meta: {
			title: '壁纸',
			icon: <TbPhotoSquareRounded />
		}
	},
	{
		path: 'collection',
		element: createElement(lazy(() => import('@/views/collection'))),
		meta: {
			title: '收藏夹',
			icon: <TbFolderHeart />
		}
	},
	{
		path: 'history',
		element: createElement(lazy(() => import('@/views/history'))),
		meta: {
			title: '历史记录',
			icon: <TbHistory />
		}
	},
	{
		path: 'user-center',
		element: createElement(lazy(() => import('@/views/user-center')))
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
