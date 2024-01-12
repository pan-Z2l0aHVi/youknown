import { createBrowserRouter } from 'react-router-dom'

import App from '@/app'

import { routes } from './routes'

const router = createBrowserRouter([
	{
		path: '*',
		element: <App />,
		children: routes
	}
])

export default router
