import { createElement, lazy } from 'react'
import { Navigate } from 'react-router-dom'

export const componentRoutes = [
	{
		name: 'Button',
		path: 'button',
		element: createElement(lazy(() => import('@ui/ButtonExample')))
	},
	{
		name: 'Switch',
		path: 'switch',
		element: createElement(lazy(() => import('@ui/SwitchExample')))
	},
	{
		name: 'Radio',
		path: 'radio',
		element: createElement(lazy(() => import('@ui/RadioExample')))
	},
	{
		name: 'Checkbox',
		path: 'checkbox',
		element: createElement(lazy(() => import('@ui/CheckboxExample')))
	},
	{
		name: 'Input',
		path: 'input',
		element: createElement(lazy(() => import('@ui/InputExample')))
	},
	{
		name: 'Tooltip',
		path: 'tooltip',
		element: createElement(lazy(() => import('@ui/TooltipExample')))
	},
	{
		name: 'Collapse',
		path: 'collapse',
		element: createElement(lazy(() => import('@ui/CollapseExample')))
	},
	{
		name: 'Loading',
		path: 'loading',
		element: createElement(lazy(() => import('@ui/LoadingExample')))
	},
	{
		name: 'List',
		path: 'list',
		element: createElement(lazy(() => import('@ui/ListExample')))
	},
	{
		name: 'Modal',
		path: 'modal',
		element: createElement(lazy(() => import('@ui/ModalExample')))
	},
	{
		name: 'Card',
		path: 'card',
		element: createElement(lazy(() => import('@ui/CardExample')))
	},
	{
		name: 'Progress',
		path: 'progress',
		element: createElement(lazy(() => import('@ui/ProgressExample')))
	},
	{
		name: 'Avatar',
		path: 'avatar',
		element: createElement(lazy(() => import('@ui/AvatarExample')))
	},
	{
		name: 'Image',
		path: 'image',
		element: createElement(lazy(() => import('@ui/ImageExample')))
	},
	{
		name: 'Form',
		path: 'form',
		element: createElement(lazy(() => import('@ui/FormExample')))
	},
	{
		name: 'Dialog',
		path: 'dialog',
		element: createElement(lazy(() => import('@ui/DialogExample')))
	},
	{
		name: 'Popover',
		path: 'popover',
		element: createElement(lazy(() => import('@ui/PopoverExample')))
	},
	{
		name: 'Tabs',
		path: 'tabs',
		element: createElement(lazy(() => import('@ui/TabsExample')))
	},
	{
		name: 'Select',
		path: 'select',
		element: createElement(lazy(() => import('@ui/SelectExample')))
	},
	{
		name: 'Toast',
		path: 'toast',
		element: createElement(lazy(() => import('@ui/ToastExample')))
	},
	{
		name: 'Tag',
		path: 'tag',
		element: createElement(lazy(() => import('@ui/TagExample')))
	},
	{
		name: 'Drawer',
		path: 'drawer',
		element: createElement(lazy(() => import('@ui/DrawerExample')))
	},
	{
		name: 'Dropdown',
		path: 'dropdown',
		element: createElement(lazy(() => import('@ui/DropdownExample')))
	},
	{
		name: 'Trigger',
		path: 'trigger',
		element: createElement(lazy(() => import('@ui/TriggerExample')))
	},
	{
		name: 'Editor',
		path: 'editor',
		element: createElement(lazy(() => import('@editor/EditorExample')))
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
