const { t } = await import('i18next')
import { createElement, lazy, ReactNode } from 'react'
import { TbBook2, TbFolderHeart, TbHistory, TbSmartHome, TbVersions } from 'react-icons/tb'
import { Navigate } from 'react-router-dom'

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
		path: 'home',
		meta: {
			title: () => t('page.title.home'),
			icon: <TbSmartHome />
		},
		children: [
			{
				path: '',
				element: createElement(lazy(() => import('@/views/home')))
			}
		]
	},
	// {
	// 	path: 'library',
	// 	meta: {
	// 		title: () => t('page.title.library'),
	// 		icon: <TbBook2 />
	// 	},
	// 	element: createElement(lazy(() => import('@/views/library'))),
	// 	children: [
	// 		{
	// 			path: ':space_id',
	// 			children: [
	// 				{
	// 					path: '',
	// 					element: createElement(lazy(() => import('@/views/space-detail')))
	// 				},
	// 				{
	// 					path: 'editor',
	// 					element: createElement(lazy(() => import('@/views/doc-editor')))
	// 				}
	// 			]
	// 		}
	// 	]
	// },
	{
		path: '*',
		element: <Navigate to="home" replace />
	}
]
