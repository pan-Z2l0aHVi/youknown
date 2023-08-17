import '@youknown/css/src/common-vars.scss'
import '@/styles/reset.scss'
import '@/styles/theme.scss'
import 'virtual:uno.css'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from '@/app'
import store from '@/store'

createRoot(document.getElementById('app') as HTMLElement).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)
