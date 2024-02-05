import 'virtual:uno.css'
import '@/styles/reset.scss'
import '@/styles/theme.scss'
import '@/utils/i18n'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'

createRoot(document.getElementById('app') as HTMLElement).render(<RouterProvider router={router} />)
