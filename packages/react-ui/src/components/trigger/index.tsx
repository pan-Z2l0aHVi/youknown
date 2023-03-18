import {
	autoUpdate,
	flip,
	offset,
	Placement,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useMergeRefs,
	useRole
} from '@floating-ui/react'
import React, {
	Children,
	cloneElement,
	forwardRef,
	HTMLAttributes,
	ReactElement,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react'
import { createPortal } from 'react-dom'
import { UI_PREFIX } from '../../constants'
import Motion from '../motion'
import { useZIndex } from '../../hooks/use-z-index'
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
	appendTo?: HTMLElement | null
	ariaRole?: 'dialog' | 'alertdialog' | 'tooltip' | 'menu' | 'listbox' | 'grid' | 'tree'
	onClickOutside?: (event: globalThis.MouseEvent) => void
	onOpenChange?: (open: boolean) => void
}

const Trigger = forwardRef<HTMLElement, TriggerProps>((props, propRef) => {
	const {
		children,
		popup,
		defaultOpen = false,
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
		ariaRole = 'tooltip',
		onClickOutside,
		onOpenChange,
		style,
		...rest
	} = props

	const isHover = trigger === 'hover'
	const isClick = trigger === 'click'
	const isManual = trigger === 'manual'

	const refRef = useRef<HTMLElement | null>(null)
	const [_open, _setOpen] = useState(isManual ? open : defaultOpen)
	const { x, y, strategy, refs, context } = useFloating({
		open: _open,
		onOpenChange: val => {
			_setOpen(val)
			onOpenChange?.(val)
		},
		placement,
		whileElementsMounted: autoUpdate,
		middleware: [offset({ mainAxis: spacing, crossAxis: crossOffset }), flip(), shift()]
	})

	const hover = useHover(context, {
		enabled: isHover,
		move: false,
		delay: {
			open: mouseEnterDelay,
			close: mouseLeaveDelay
		},
		handleClose: safePolygon()
	})
	const click = useClick(context, {
		enabled: isClick
	})
	const focus = useFocus(context, {
		enabled: !isManual
	})
	const dismiss = useDismiss(context, {
		outsidePressEvent: 'pointerdown',
		outsidePress: event => {
			if (!refRef.current?.contains(event.target as HTMLElement)) {
				onClickOutside?.(event)
			}
			return !isManual
		}
	})
	const role = useRole(context, { role: ariaRole })

	const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, focus, dismiss, role])

	const child = Children.only(children)

	useEffect(() => {
		_setOpen(open)
	}, [open])

	const zIndex = useZIndex(_open)

	const prefixCls = `${UI_PREFIX}-trigger`

	const popupEle = (
		<div
			ref={refs.setFloating}
			className={`${prefixCls}-content`}
			style={{
				position: strategy,
				top: y ?? 0,
				left: x ?? 0,
				width: 'max-content',
				zIndex,
				...style
			}}
			{...getFloatingProps(rest)}
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

	const ref = useMergeRefs([propRef, refs.setReference])
	const triggerEle = cloneElement(child, {
		ref: (node: HTMLElement) => {
			refRef.current = node
			ref?.(node)
		},
		...getReferenceProps(child.props)
	})

	return disabled ? (
		child
	) : (
		<>
			{triggerEle}
			{appendTo ? createPortal(portalEle, appendTo) : portalEle}
		</>
	)
})
Trigger.displayName = 'Trigger'
export default Trigger
