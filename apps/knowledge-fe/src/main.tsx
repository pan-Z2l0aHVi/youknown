import '@youknown/css/src/common-vars.scss'
import '@/styles/reset.scss'
import '@/styles/theme.scss'
import 'virtual:uno.css'

import { createRoot } from 'react-dom/client'

import router from '@/router'
import { init_i18n } from '@/utils/i18n'

init_i18n()
const { RouterProvider } = await import('react-router-dom')

createRoot(document.getElementById('app') as HTMLElement).render(<RouterProvider router={router} />)
