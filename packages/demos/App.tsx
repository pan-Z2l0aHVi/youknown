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
		if (root) {
			root.style.setProperty('--g-bg-0', isDark ? '#101014' : '#fff')
			root.style.setProperty('--g-bg-1', isDark ? '#232429' : '#fff')
			root.style.setProperty('--g-bg-2', isDark ? '#18181C' : '#f4f4f4')
			root.style.setProperty('--g-bg-3', isDark ? '#303033' : '#eee')
			root.style.setProperty('--g-bd-line', isDark ? '#424248' : '#dee0e3')
			root.style.setProperty('--g-scrollbar', isDark ? '200,200,200' : '27,27,27')
			root.style.setProperty('--g-text-1', isDark ? '#fff' : '#1f2329')
			root.style.setProperty('--g-text-2', isDark ? '#ccc' : '#666')
			root.style.setProperty('--g-text-3', isDark ? '#999' : '#999')
			root.style.setProperty('--g-color-hover', isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)')
			root.style.setProperty('--g-color-active', isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)')
			root.style.setProperty('--g-color-primary', '#007bca')
			root.style.setProperty('--g-color-primary-hover', '#0095da')
			root.style.setProperty('--g-color-primary-active', '#0063a7')
			root.style.setProperty('--g-color-danger', '#d52515')
			root.style.setProperty('--g-color-danger-hover', '#f93920')
			root.style.setProperty('--g-color-danger-active', '#b2140c')
			root.style.setProperty(
				'--g-shadow-l',
				isDark ? '0 4px 14px rgba(0,0,0,0.25)' : '0 4px 14px rgba(0,0,0,0.1)'
			)
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
					<Suspense fallback={<Loading />}>{contentEle}</Suspense>
				</div>
			</div>
		</div>
	)
}

export default App
