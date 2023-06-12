import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@youknown/css/src/vars.scss'
import './index.scss'
import './theme.scss'
import App from './App'

createRoot(document.getElementById('app') as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
