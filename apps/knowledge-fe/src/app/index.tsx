import { lazy, Suspense } from 'react'
import { useMatch } from 'react-router-dom'

import { useInitApp } from '@/hooks/use-init-app'
import { useRouteScrollTop } from '@/hooks/use-route-scroll-top'
import { useUIStore } from '@/stores'

import { DesktopLayout, MobileLayout, NoLayout } from './components/layout'
import PageProgress from './components/page-progress'

const FabBar = lazy(() => import('./components/fab-bar'))
const PreferencesModal = lazy(() => import('./components/preferences-modal'))
const LoginModal = lazy(() => import('./components/login-modal'))

export default function App() {
  const is_mobile = useUIStore(state => state.is_mobile)
  useRouteScrollTop()
  useInitApp()
  const login_success_match = useMatch('/login-success')
  const with_layout = !login_success_match

  const global_els = (
    <>
      {is_mobile || <PageProgress />}
      <Suspense>
        <PreferencesModal />
      </Suspense>
      <Suspense>
        <LoginModal />
      </Suspense>
    </>
  )

  return (
    <>
      {global_els}

      {with_layout ? (
        <>
          {is_mobile ? <MobileLayout /> : <DesktopLayout />}
          <Suspense>
            <FabBar />
          </Suspense>
        </>
      ) : (
        <NoLayout />
      )}
    </>
  )
}
