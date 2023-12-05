import '@youknown/css/src/common-vars.scss'
import '@/styles/reset.scss'
import '@/styles/theme.scss'
import 'virtual:uno.css'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from '@/router'

import { registerServiceWorker } from './worker'

registerServiceWorker()

createRoot(document.getElementById('app') as HTMLElement).render(<RouterProvider router={router} />)
