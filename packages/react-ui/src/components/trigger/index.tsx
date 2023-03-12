import { autoUpdate, flip, offset, Placement, useFloating } from '@floating-ui/react-dom'
import { useComposeRef } from '@youknown/react-hook/src'
import React, {
	Children,
	cloneElement,
	forwardRef,
	HTMLAttributes,
	MouseEvent,
	ReactElement,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react'
import { createPortal } from 'react-dom'
import { UI_PREFIX } from '../../constants'
import Motion from '../motion'
import './trigger.scss'

export const EventsByTriggerNeed = [
	'onClick',
	'onMouseEnter',
	'onMouseLeave',
	'onMouseMove',
	'onFocus',
	'onBlur',
	'onContextMenu',
	'onKeyDown'
] as (
	| 'onClick'
	| 'onMouseEnter'
	| 'onMouseLeave'
	| 'onMouseMove'
	| 'onFocus'
	| 'onBlur'
	| 'onContextMenu'
	| 'onKeyDown'
)[]

interface TriggerProps extends HTMLAttributes<HTMLElement> {
	children: ReactElement
	open?: boolean
	defaultOpen?: boolean
	popup?: ReactNode
	trigger?: 'hover' | 'click' | 'manual'
	placement?: Placement
	mouseEnterDelay?: number
	mouseLeaveDelay?: number
	spacing?: number
	crossOffset?: number
	disabled?: boolean
	unmountOnExit?: boolean
	motion?: 'none' | 'grow' | 'stretch' | 'fade' | 'zoom'
	growTransformOrigin?: string
	appendTo?: HTMLElement
	onClickOutside?: (event: globalThis.MouseEvent) => void
	onOpenChange?: (open: boolean) => void
}

const Trigger = forwardRef<HTMLElement, TriggerProps>((props, propRef) => {
	const {
		children,
		popup,
		defaultOpen: defaultOpen = false,
		open = defaultOpen,
		trigger = 'hover',
		placement = 'bottom-start',
		mouseEnterDelay = 100,
		mouseLeaveDelay = 100,
		spacing = 8,
		crossOffset = 0,
		disabled = false,
		unmountOnExit = true,
		motion = 'none',
		growTransformOrigin = 'center',
		appendTo = document.body,
		onClickOutside,
		onOpenChange
	} = props

	const isHover = trigger === 'hover'
	const isClick = trigger === 'click'
	const isManual = trigger === 'manual'

	const [_open, _setOpen] = useState(isManual ? open : defaultOpen)
	const { x, y, floating, strategy, refs } = useFloating({
		placement,
		whileElementsMounted: (...args) =>
			autoUpdate(...args, {
				animationFrame: true
			}),
		middleware: [flip(), offset({ mainAxis: spacing, crossAxis: crossOffset })]
	})

	const timerRef = useRef(0)
	const clearTimer = () => {
		clearTimeout(timerRef.current)
	}
	const setDelayOpen = (val: boolean, delay: number) => {
		if (delay) {
			clearTimer()
			timerRef.current = window.setTimeout(() => {
				onOpenChange?.(val)
				_setOpen(val)
			}, delay)
		} else {
			console.log('delay: ', delay)
			onOpenChange?.(val)
			_setOpen(val)
		}
	}

	const child = Children.only(children)
	const doChildEvent = (eventName: string, event: MouseEvent) => {
		child.props[eventName]?.(event)
	}

	const onMouseEnter = (event: MouseEvent) => {
		doChildEvent('onMouseEnter', event)
		setDelayOpen(true, mouseEnterDelay)
	}
	const onMouseLeave = (event: MouseEvent) => {
		doChildEvent('onMouseLeave', event)
		setDelayOpen(false, mouseLeaveDelay)
	}
	const onClick = (event: MouseEvent) => {
		doChildEvent('onClick', event)
		event.nativeEvent.stopImmediatePropagation()
		_setOpen(p => !p)
	}

	const mixProps: Record<string, any> = {
		[`data-open`]: _open ? 1 : 0
	}
	if (isHover) {
		mixProps.onMouseEnter = onMouseEnter
		mixProps.onMouseLeave = onMouseLeave
	} else if (isClick) {
		mixProps.onClick = onClick
	}

	const popupProps: Record<string, any> = {}
	if (isHover) {
		popupProps.onMouseEnter = clearTimer
		popupProps.onMouseLeave = onMouseLeave
	}

	useEffect(() => {
		const hide = (event: globalThis.MouseEvent) => {
			if (!_open) return
			if (isClick || isHover) {
				_setOpen(false)
			}
			onClickOutside?.(event)
		}
		document.addEventListener('click', hide)
		return () => {
			document.removeEventListener('click', hide)
		}
	}, [_open, isClick, isHover, onClickOutside])

	useEffect(() => {
		_setOpen(open)
	}, [open])

	const prefixCls = `${UI_PREFIX}-trigger`

	const popupEle = (
		<div
			ref={floating}
			className={`${prefixCls}-content`}
			style={{
				position: strategy,
				top: y ?? 0,
				left: x ?? 0,
				width: 'max-content'
			}}
			{...mixProps}
			onClick={event => {
				event.nativeEvent.stopImmediatePropagation()
			}}
		>
			{popup}
		</div>
	)

	const [stretchDirection] = placement.split('-') as ('left' | 'top' | 'right' | 'bottom')[]
	let portalEle: ReactNode
	switch (motion) {
		case 'none':
			if (unmountOnExit) portalEle = _open ? popupEle : null
			else portalEle = <div style={{ width: 'max-content', display: _open ? 'initial' : 'none' }}>{popupEle}</div>
			break
		case 'stretch':
			portalEle = (
				<Motion.Stretch in={_open} mountOnEnter unmountOnExit={unmountOnExit} direction={stretchDirection}>
					{popupEle}
				</Motion.Stretch>
			)
			break
		case 'grow':
			portalEle = (
				<Motion.Grow
					in={_open}
					mountOnEnter
					unmountOnExit={unmountOnExit}
					style={{ transformOrigin: growTransformOrigin }}
				>
					{popupEle}
				</Motion.Grow>
			)
			break
		case 'fade':
			portalEle = (
				<Motion.Fade in={_open} mountOnEnter unmountOnExit={unmountOnExit}>
					{popupEle}
				</Motion.Fade>
			)
			break
		case 'zoom':
			portalEle = (
				<Motion.Zoom in={_open} mountOnEnter unmountOnExit={unmountOnExit}>
					{popupEle}
				</Motion.Zoom>
			)
			break
	}

	const ref = useComposeRef(propRef, refs.reference)
	const triggerEle = cloneElement(child, {
		ref,
		...mixProps
	})

	return disabled ? (
		child
	) : (
		<>
			{triggerEle}
			{createPortal(portalEle, appendTo)}
		</>
	)
})
Trigger.displayName = 'Trigger'
export default Trigger
