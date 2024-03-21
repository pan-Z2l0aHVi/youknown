import { StrictMode } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from '@/app'
import ErrorBoundary from '@/app/components/error-boundary'

import { routes } from './routes'

const router = createBrowserRouter([
	{
		path: '*',
		element: (
			<StrictMode>
				<App />
			</StrictMode>
		),
		children: routes,
		errorElement: <ErrorBoundary />
	}
])

export default router
