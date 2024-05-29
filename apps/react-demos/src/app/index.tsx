import { useBoolean } from '@youknown/react-hook/src'
import { Button, Drawer, Loading, Space, Tooltip } from '@youknown/react-ui/src'
import { checkMobile, cls, onMobileChange } from '@youknown/utils/src'
import { Suspense, useEffect, useState } from 'react'
import { CgDarkMode } from 'react-icons/cg'
import { TbMenu2 } from 'react-icons/tb'
import { NavLink, useOutlet } from 'react-router-dom'

import { componentRoutes } from '@/router'

import TransitionView from './components/transition-view'

const App = () => {
  const [isDark, { setReverse: toggleDark }] = useBoolean(false)
  const [sidebarVisible, { setReverse: toggleSidebar, setFalse: hideSidebar, setTrue: showSidebar }] = useBoolean(false)
  const outlet = useOutlet()
  const [isMobile, setIsMobile] = useState(checkMobile())

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(':root')
    if (!root) return
    if (isDark) {
      root.classList.add('dark-theme')
      root.classList.remove('light-theme')
    } else {
      root.classList.add('light-theme')
      root.classList.remove('dark-theme')
    }
  }, [isDark])

  useEffect(() => {
    const off = onMobileChange(() => {
      setIsMobile(checkMobile())
    })
    return () => {
      off()
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      hideSidebar()
    } else {
      showSidebar()
    }
  }, [hideSidebar, isMobile, showSidebar])

  const navEle = (
    <Space direction="vertical" size="small">
      {componentRoutes.map(({ path, name }) => (
        <NavLink
          key={path}
          to={`/component/${path}`}
          className={({ isActive }) =>
            cls(
              'flex items-center w-100% h-30px p-[0_12px] rd-radius-l color-text-1 text-15px decoration-none select-none',
              '[@media(hover:hover)]-hover-bg-hover active-bg-active',
              {
                '!bg-active': isActive
              }
            )
          }
          onClick={isMobile ? hideSidebar : undefined}
        >
          <div className="wrap">{name}</div>
        </NavLink>
      ))}
    </Space>
  )

  const sidebarEle = isMobile ? (
    <Drawer className="w-70%" open={sidebarVisible} placement="left" onCancel={hideSidebar}>
      <div className="h-100% p-[16px_8px] bg-bg2 overflow-y-auto">{navEle}</div>
    </Drawer>
  ) : (
    <>
      {sidebarVisible && (
        // 外层 relative 撑起容器高度
        <div className="relative">
          <div
            className={cls(
              'sticky top-0 max-h-100vh',
              'w-240px h-100% p-[48px_8px_16px_8px] b-r-solid b-r-1px b-divider bg-bg2 overflow-y-auto'
            )}
          >
            {navEle}
          </div>
        </div>
      )}
    </>
  )

  const contentEle = (
    <>
      {isMobile ? (
        <TransitionView>
          <Suspense
            fallback={
              <div className="min-h-[calc(100vh-48px)] bg-bg-0 flex items-center justify-center">
                <Loading spinning />
              </div>
            }
          >
            <div className="min-h-[calc(100vh-48px)] bg-bg-0 pl-16px pr-16px">{outlet}</div>
          </Suspense>
        </TransitionView>
      ) : (
        <Suspense fallback={<Loading spinning />}>
          <div className="bg-bg-0 pl-24px pr-24px">{outlet}</div>
        </Suspense>
      )}
    </>
  )

  return (
    <main className="min-h-screen flex bg-bg-0 color-text-1">
      <Button className="z-1 fixed left-8px top-8px" square onClick={toggleSidebar}>
        <TbMenu2 />
      </Button>

      {sidebarEle}

      <div className="flex-1 flex flex-col">
        <div className="p-[8px_64px]">
          <Tooltip placement="bottom" title={`切换${isDark ? '亮色' : '暗色'}模式`}>
            <Button square onClick={toggleDark}>
              <CgDarkMode />
            </Button>
          </Tooltip>
        </div>

        {contentEle}
      </div>
    </main>
  )
}

export default App
