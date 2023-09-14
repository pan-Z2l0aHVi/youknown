import { Suspense, useEffect } from 'react'
import { NavLink, useRoutes } from 'react-router-dom'

import router, { componentRoutes } from '@/router/routes'
import { Button, Loading, Space, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { TbMenu2 } from 'react-icons/tb'
import { useBoolean } from '@youknown/react-hook/src'
import { CgDarkMode } from 'react-icons/cg'

const App = () => {
	const contentEle = useRoutes(router)
	const [isDark, { setReverse: toggleDark }] = useBoolean(false)
	const [sidebarVisible, { setReverse: toggleSidebar }] = useBoolean(false)

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

	const navEle = (
		<Space direction="vertical" size="small">
			{componentRoutes.map(({ path, name }) => (
				<NavLink
					key={path}
					to={`/component/${path}`}
					className={({ isActive }) =>
						cls(
							'flex items-center w-100% h-30px p-[0_12px] rd-radius-l color-text-1 text-15px decoration-none',
							'hover-bg-hover active-bg-active',
							{
								'bg-active': isActive
							}
						)
					}
				>
					<div className="wrap">{name}</div>
				</NavLink>
			))}
		</Space>
	)

	return (
		<div className="flex h-100vh bg-bg-0 color-text-1">
			<Button className="fixed left-8px top-8px" square onClick={toggleSidebar}>
				<TbMenu2 />
			</Button>
			{sidebarVisible && (
				<div className="w-240px h-100% p-[48px_8px_16px_8px] b-solid b-r-1px b-bd-line bg-bg2 overflow-y-auto">
					{navEle}
				</div>
			)}
			<div className="flex-1 overflow-y-auto">
				<div className="p-[8px_64px]">
					<Tooltip placement="bottom" title={`切换${isDark ? '浅色' : '深色'}模式`}>
						<Button square onClick={toggleDark}>
							<CgDarkMode />
						</Button>
					</Tooltip>
				</div>
				<div className="p-[0_64px]">
					<Suspense fallback={<Loading spinning />}>{contentEle}</Suspense>
				</div>
			</div>
		</div>
	)
}

export default App
