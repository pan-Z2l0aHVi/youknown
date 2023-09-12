import './trigger.scss'

import {
	Children,
	cloneElement,
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
	ReactElement,
	ReactNode,
	useRef
} from 'react'
import { createPortal } from 'react-dom'

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
import { useControllable } from '@youknown/react-hook/src'
import { omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { useZIndex, ZIndexLevel } from '../../hooks/useZIndex'
import Motion from '../motion'

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
	appendTo?: HTMLElement | null
	zIndexLevel?: ZIndexLevel
	ariaRole?: 'dialog' | 'alertdialog' | 'tooltip' | 'menu' | 'listbox' | 'grid' | 'tree'
	onClickOutside?: (event: globalThis.MouseEvent) => void
	onOpenChange?: (open: boolean) => void
}

const Trigger = (props: TriggerProps, propRef: ForwardedRef<HTMLElement>) => {
	const {
		children,
		popup,
		trigger = 'hover',
		placement = 'bottom-start',
		mouseEnterDelay = 100,
		mouseLeaveDelay = 100,
		spacing = 8,
		crossOffset = 0,
		disabled = false,
		unmountOnExit = true,
		motion = 'none',
		appendTo = document.body,
		zIndexLevel = 'tooltip',
		ariaRole = 'tooltip',
		onClickOutside,
		style,
		...rest
	} = omit(props, 'defaultOpen', 'open', 'onOpenChange')

	const isHover = trigger === 'hover'
	const isClick = trigger === 'click'
	const isManual = trigger === 'manual'

	const refRef = useRef<HTMLElement | null>(null)
	const [open, setOpen] = useControllable(props, {
		defaultValue: false,
		defaultValuePropName: 'defaultOpen',
		valuePropName: 'open',
		trigger: 'onOpenChange'
	})

	const { x, y, strategy, refs, context } = useFloating({
		open: open,
		onOpenChange: setOpen,
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

	const zIndex = useZIndex(zIndexLevel, open)

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

	let portalEle: ReactNode
	switch (motion) {
		case 'none':
			if (unmountOnExit) portalEle = open ? popupEle : null
			else portalEle = <div style={{ width: 'max-content', display: open ? 'initial' : 'none' }}>{popupEle}</div>
			break
		case 'stretch':
			const [stretchDirection] = placement.split('-') as ('left' | 'top' | 'right' | 'bottom')[]
			portalEle = (
				<Motion.Stretch in={open} mountOnEnter unmountOnExit={unmountOnExit} direction={stretchDirection}>
					{popupEle}
				</Motion.Stretch>
			)
			break
		case 'grow':
			const growOriginMap = {
				'top-start': 'bottom left',
				top: 'bottom',
				'top-end': 'bottom right',
				'bottom-start': 'top left',
				bottom: 'top',
				'bottom-end': 'top right',
				'left-start': 'top right',
				left: 'right',
				'left-end': 'bottom right',
				'right-start': 'top left',
				right: 'left',
				'right-end': 'bottom left'
			}
			const transformOrigin = growOriginMap[placement] ?? 'center'
			portalEle = (
				<Motion.Grow in={open} mountOnEnter unmountOnExit={unmountOnExit} style={{ transformOrigin }}>
					{popupEle}
				</Motion.Grow>
			)
			break
		case 'fade':
			portalEle = (
				<Motion.Fade in={open} mountOnEnter unmountOnExit={unmountOnExit}>
					{popupEle}
				</Motion.Fade>
			)
			break
		case 'zoom':
			portalEle = (
				<Motion.Zoom in={open} mountOnEnter unmountOnExit={unmountOnExit}>
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
		cloneElement(child, { ref })
	) : (
		<>
			{triggerEle}
			{appendTo ? createPortal(portalEle, appendTo) : portalEle}
		</>
	)
}
Trigger.displayName = 'Trigger'
const RefTrigger = forwardRef(Trigger)
export default RefTrigger
