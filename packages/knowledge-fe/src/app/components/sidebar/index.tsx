import { useBoolean } from '@youknown/react-hook/src'
import { Divider, Loading, Tooltip } from '@youknown/react-ui/src'
import { cls, storage } from '@youknown/utils/src'
import React, { lazy, Suspense, useCallback, useEffect, useState, useTransition } from 'react'
import { TbDotsVertical } from 'react-icons/tb'
import Menu from './components/menu'

const Account = lazy(() => import('./components/account'))

const EXPAND_KEY = 'sidebar-expand'
const WIDTH_KEY = 'sidebar-width'
const DEFAULT_WIDTH = 240
const MIN_WIDTH = 160
const MAX_WIDTH = 400

export default function Sidebar() {
	const session_expand = storage.session.get<boolean>(EXPAND_KEY)
	const session_width = storage.session.get<number>(WIDTH_KEY)
	const [expand, { setReverse: toggle_expand }] = useBoolean(session_expand ?? true)

	const [sidebar_width, set_sidebar_width] = useState(session_width ?? DEFAULT_WIDTH)
	const [dragging, { setTrue: start_drag, setFalse: stop_drag }] = useBoolean(false)
	const [, startTransition] = useTransition()

	useEffect(() => {
		storage.session.set(EXPAND_KEY, expand)
	}, [expand])

	useEffect(() => {
		storage.session.set(WIDTH_KEY, sidebar_width)
	}, [sidebar_width])

	const handle_mousemove = useCallback(
		(e: MouseEvent) => {
			if (!dragging) return
			if (e.clientX > MAX_WIDTH) return
			if (e.clientX < MIN_WIDTH) return

			startTransition(() => {
				set_sidebar_width(e.clientX)
			})
		},
		[dragging]
	)

	useEffect(() => {
		document.addEventListener('mousemove', handle_mousemove)
		document.addEventListener('mouseup', stop_drag)
		return () => {
			document.removeEventListener('mousemove', handle_mousemove)
			document.removeEventListener('mouseup', stop_drag)
		}
	}, [handle_mousemove, stop_drag])

	let sidebar_style = {}
	if (expand) {
		sidebar_style = {
			width: sidebar_width
		}
	}

	const drag_divider = expand ? (
		<div
			className="group absolute right--8px top-0 p-[4px_8px] h-100% cursor-col-resize active:cursor-col-resize"
			onMouseDown={start_drag}
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
			className={cls('relative flex flex-col h-screen border-r-bd-line border-r bg-bg-2 p-[16px_12px]', {
				'transition-width-300': !dragging,
				'w-68px': !expand
			})}
			style={sidebar_style}
		>
			<div className="h-32px m-b-24px">
				<img
					className="w-32px h-32px m-l-6px"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg2k9FA9S2ggEeYF1KDUhHuTgqsAnkJ0enMZRIZkB8Nw&s"
				/>
			</div>

			<Menu expand={expand} />

			<Suspense fallback={<Loading />}>
				<Account expand={expand} />
			</Suspense>

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
