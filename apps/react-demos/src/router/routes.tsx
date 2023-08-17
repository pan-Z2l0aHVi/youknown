import { createElement, lazy } from 'react'
import { Navigate } from 'react-router-dom'

export const componentRoutes = [
	{
		name: 'Button',
		path: 'button',
		element: createElement(lazy(() => import('@/ui-views/ButtonExample')))
	},
	{
		name: 'Switch',
		path: 'switch',
		element: createElement(lazy(() => import('@/ui-views/SwitchExample')))
	},
	{
		name: 'Radio',
		path: 'radio',
		element: createElement(lazy(() => import('@/ui-views/RadioExample')))
	},
	{
		name: 'Checkbox',
		path: 'checkbox',
		element: createElement(lazy(() => import('@/ui-views/CheckboxExample')))
	},
	{
		name: 'Input',
		path: 'input',
		element: createElement(lazy(() => import('@/ui-views/InputExample')))
	},
	{
		name: 'Tooltip',
		path: 'tooltip',
		element: createElement(lazy(() => import('@/ui-views/TooltipExample')))
	},
	{
		name: 'Collapse',
		path: 'collapse',
		element: createElement(lazy(() => import('@/ui-views/CollapseExample')))
	},
	{
		name: 'Loading',
		path: 'loading',
		element: createElement(lazy(() => import('@/ui-views/LoadingExample')))
	},
	{
		name: 'List',
		path: 'list',
		element: createElement(lazy(() => import('@/ui-views/ListExample')))
	},
	{
		name: 'Modal',
		path: 'modal',
		element: createElement(lazy(() => import('@/ui-views/ModalExample')))
	},
	{
		name: 'Card',
		path: 'card',
		element: createElement(lazy(() => import('@/ui-views/CardExample')))
	},
	{
		name: 'Progress',
		path: 'progress',
		element: createElement(lazy(() => import('@/ui-views/ProgressExample')))
	},
	{
		name: 'Avatar',
		path: 'avatar',
		element: createElement(lazy(() => import('@/ui-views/AvatarExample')))
	},
	{
		name: 'Image',
		path: 'image',
		element: createElement(lazy(() => import('@/ui-views/ImageExample')))
	},
	{
		name: 'Form',
		path: 'form',
		element: createElement(lazy(() => import('@/ui-views/FormExample')))
	},
	{
		name: 'Dialog',
		path: 'dialog',
		element: createElement(lazy(() => import('@/ui-views/DialogExample')))
	},
	{
		name: 'Popover',
		path: 'popover',
		element: createElement(lazy(() => import('@/ui-views/PopoverExample')))
	},
	{
		name: 'Tabs',
		path: 'tabs',
		element: createElement(lazy(() => import('@/ui-views/TabsExample')))
	},
	{
		name: 'Select',
		path: 'select',
		element: createElement(lazy(() => import('@/ui-views/SelectExample')))
	},
	{
		name: 'Toast',
		path: 'toast',
		element: createElement(lazy(() => import('@/ui-views/ToastExample')))
	},
	{
		name: 'Tag',
		path: 'tag',
		element: createElement(lazy(() => import('@/ui-views/TagExample')))
	},
	{
		name: 'Drawer',
		path: 'drawer',
		element: createElement(lazy(() => import('@/ui-views/DrawerExample')))
	},
	{
		name: 'Dropdown',
		path: 'dropdown',
		element: createElement(lazy(() => import('@/ui-views/DropdownExample')))
	},
	{
		name: 'Trigger',
		path: 'trigger',
		element: createElement(lazy(() => import('@/ui-views/TriggerExample')))
	},
	{
		name: 'Upload',
		path: 'upload',
		element: createElement(lazy(() => import('@/ui-views/UploadExample')))
	},
	{
		name: 'Editor',
		path: 'editor',
		element: createElement(lazy(() => import('@/editor-views/EditorExample')))
	},
	{
		name: 'UseFetch',
		path: 'use_fetch',
		element: createElement(lazy(() => import('@/hook-views/UseFetchExample')))
	},
	{
		name: 'UsePagination',
		path: 'use_pagination',
		element: createElement(lazy(() => import('@/hook-views/UsePaginationExample')))
	},
	{
		name: 'UseInfinity',
		path: 'use_infinity',
		element: createElement(lazy(() => import('@/hook-views/UseInfinityExample')))
	}
]

const routes = [
	{
		path: 'component',
		children: componentRoutes
	},
	{
		path: '*',
		element: <Navigate to={`component/${componentRoutes[0].path}`} replace />
	}
]

export default routes
