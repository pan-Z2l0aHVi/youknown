import '@youknown/css/src/common-vars.scss'
import '@/styles/reset.scss'
import '@/styles/theme.scss'
import 'virtual:uno.css'
import '@/utils/i18n'

import { createRoot } from 'react-dom/client'

import router from '@/router'

const { RouterProvider } = await import('react-router-dom')

createRoot(document.getElementById('app') as HTMLElement).render(<RouterProvider router={router} />)
