import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import '@youknown/css/src/vars.scss'
import '@/styles/reset.scss'
import '@/styles/theme.scss'
import 'virtual:uno.css'

import store from '@/store'
import App from '@/app'

createRoot(document.getElementById('app') as HTMLElement).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)
