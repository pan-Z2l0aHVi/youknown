import React, { Suspense, useEffect, useState } from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import { cls } from '@youknown/utils/src'
import './App.scss'
import router, { componentRoutes } from './routes'
import { Button, Loading, Space } from '@youknown/react-ui/src'

const App = () => {
	const contentEle = useRoutes(router)
	const [isDark, setIsDark] = useState(false)

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
						cls('nav-item', {
							active: isActive
						})
					}
				>
					<div className="wrap">{name}</div>
				</NavLink>
			))}
		</Space>
	)

	return (
		<div className="example">
			<div className="nav-bar">{navEle}</div>
			<div className="left-wrap">
				<div className="header">
					<Space>
						<Button text onClick={() => setIsDark(p => !p)}>
							{isDark ? '浅色' : '深色'}
						</Button>
					</Space>
				</div>
				<div className="content">
					<Suspense fallback={<Loading spinning />}>{contentEle}</Suspense>
				</div>
			</div>
		</div>
	)
}

export default App
