import App from '@/app'
import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

const router = createBrowserRouter([
	{
		path: '*',
		element: <App />,
		children: routes
	}
])

export default router
