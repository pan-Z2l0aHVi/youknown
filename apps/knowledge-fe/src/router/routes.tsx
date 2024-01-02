const { t } = await import('i18next')
import { createElement, lazy, ReactNode } from 'react'
import { TbBook2, TbFolderHeart, TbHistory, TbLayout, TbPhotoSquareRounded } from 'react-icons/tb'

const { Navigate } = await import('react-router-dom')

export interface RouteItem {
	path: string
	element?: ReactNode
	children?: RouteItem[]
	meta?: {
		title?: () => string
		icon?: ReactNode
	}
}

export const routes: RouteItem[] = [
	{
		path: 'browse',
		meta: {
			title: () => t('page.title.browse'),
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
			title: () => t('page.title.library'),
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
			title: () => t('page.title.wallpapers'),
			icon: <TbPhotoSquareRounded />
		}
	},
	{
		path: 'collection',
		element: createElement(lazy(() => import('@/views/collection'))),
		meta: {
			title: () => t('page.title.collection'),
			icon: <TbFolderHeart />
		}
	},
	{
		path: 'history',
		element: createElement(lazy(() => import('@/views/history'))),
		meta: {
			title: () => t('page.title.history'),
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
