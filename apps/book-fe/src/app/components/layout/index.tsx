import { Drawer, Loading } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { Suspense } from 'react'
import { useOutlet } from 'react-router-dom'

import { useUIStore } from '@/stores'

import Banner from '../banner'
import Sidebar from '../sidebar'
import TransitionView from '../transition-view'

export function DesktopLayout() {
  const outlet = useOutlet()
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <div className="flex-1 flex">
        {/* 外层 relative 撑起容器高度 */}
        <div className="relative">
          <Sidebar />
        </div>

        <Suspense
          fallback={
            <div className="flex-1 flex justify-center items-center">
              <Loading spinning size="large" />
            </div>
          }
        >
          <div className={cls('flex-1 sm:flex sm:flex-col')}>{outlet}</div>
        </Suspense>
      </div>
    </div>
  )
}

export function MobileLayout() {
  const menu_drawer_open = useUIStore(state => state.menu_drawer_open)
  const set_menu_drawer_open = useUIStore(state => state.set_menu_drawer_open)
  const outlet = useOutlet()
  return (
    <TransitionView>
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center bg-bg-0">
            <Loading spinning size="large" />
          </div>
        }
      >
        <div className="min-h-screen">
          <Banner />
          {outlet}
        </div>

        <Drawer
          placement="left"
          open={menu_drawer_open}
          onCancel={() => {
            set_menu_drawer_open(false)
          }}
        >
          <Sidebar />
        </Drawer>
      </Suspense>
    </TransitionView>
  )
}
