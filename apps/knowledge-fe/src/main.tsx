import 'virtual:uno.css'
import '@/styles/reset.scss'
import '@/styles/theme.scss'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from '@/router'
import { init_i18n } from '@/utils/i18n'

init_i18n()
createRoot(document.getElementById('app') as HTMLElement).render(<RouterProvider router={router} />)
