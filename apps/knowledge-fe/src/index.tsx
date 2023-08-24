import '@youknown/css/src/common-vars.scss'
import '@/styles/reset.scss'
import '@/styles/theme.scss'
import 'virtual:uno.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from '@/app'

createRoot(document.getElementById('app') as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
