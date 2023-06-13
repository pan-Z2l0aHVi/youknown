import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@youknown/css/src/common-vars.scss'
import 'virtual:uno.css'
import '@/styles/reset.scss'
import '@/styles/theme.scss'
import App from '@/app'

createRoot(document.getElementById('app') as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
