import { useEffect, useState, useTransition } from 'react'
import { TbDotsVertical } from 'react-icons/tb'

import { useBoolean, useCreation, useLatestRef } from '@youknown/react-hook/src'
import { Divider, Tooltip } from '@youknown/react-ui/src'
import { cls, storage } from '@youknown/utils/src'

import Account from './components/account'
import Menu from './components/menu'

const EXPAND_KEY = 'sidebar-expand'
const WIDTH_KEY = 'sidebar-width'
const DEFAULT_W = 240
const MIN_W = 160
const MAX_W = 400

export default function Sidebar() {
	const local_expand = useCreation(() => storage.local.get<boolean>(EXPAND_KEY))
	const local_width = useCreation(() => storage.local.get<number>(WIDTH_KEY))
	const [expand, { setReverse: toggle_expand }] = useBoolean(local_expand ?? true)

	const [sidebar_width, set_sidebar_width] = useState(local_width ?? DEFAULT_W)
	const [dragging, { setTrue: start_drag, setFalse: stop_drag }] = useBoolean(false)
	const dragging_ref = useLatestRef(dragging)
	const [, start_transition] = useTransition()

	useEffect(() => {
		storage.local.set(EXPAND_KEY, expand)
	}, [expand])

	useEffect(() => {
		storage.local.set(WIDTH_KEY, sidebar_width)
	}, [sidebar_width])

	const on_drag_events = () => {
		document.addEventListener('mousemove', handle_mousemove)
		document.addEventListener('mouseup', handle_mouseup, { once: true })
	}

	const off_drag_events = () => {
		document.removeEventListener('mousemove', handle_mousemove)
		document.removeEventListener('mouseup', handle_mouseup)
	}

	const handle_mousedown = () => {
		start_drag()
		on_drag_events()
	}

	const handle_mouseup = () => {
		stop_drag()
		off_drag_events()
	}

	const handle_mousemove = (e: MouseEvent) => {
		if (!dragging_ref.current) return
		if (e.clientX > MAX_W) return
		if (e.clientX < MIN_W) return

		start_transition(() => {
			set_sidebar_width(e.clientX)
		})
	}

	let sidebar_style = {}
	if (expand) {
		sidebar_style = {
			width: sidebar_width
		}
	}

	const drag_divider = expand ? (
		<div
			className="group absolute right--8px top-0 p-[4px_8px] h-100% cursor-col-resize active:cursor-col-resize select-none"
			onMouseDown={handle_mousedown}
		>
			<div
				className={cls('w-2px h-100% group-hover-bg-primary', {
					'bg-primary': dragging
				})}
			></div>
		</div>
	) : null

	return (
		<aside
			className={cls('relative flex flex-col h-screen b-r-1 b-r-solid b-r-bd-line bg-bg-2 p-12px', {
				'transition-width-300': !dragging,
				'w-68px': !expand
			})}
			style={sidebar_style}
		>
			<div className="h-32px mb-24px">
				<img className="w-32px h-32px ml-6px b-rd-radius-m b-1 b-bd-line b-solid" src="/branch.png" />
			</div>

			<Menu expand={expand} />

			<Account expand={expand} />

			<Divider />

			<Tooltip title={expand ? '收起' : '展开'} placement="right" spacing={20}>
				<button
					className="border-0 bg-transparent w-44px h-32px flex items-center justify-center b-rd-radius-m
					active-bg-active hover-not-active-bg-hover cursor-pointer text-16px color-text-1"
					onClick={toggle_expand}
				>
					<TbDotsVertical />
				</button>
			</Tooltip>

			{drag_divider}
		</aside>
	)
}
