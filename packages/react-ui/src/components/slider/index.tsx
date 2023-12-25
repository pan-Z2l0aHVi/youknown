import './slider.scss'

import {
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
	KeyboardEventHandler,
	MouseEventHandler,
	useLayoutEffect,
	useRef,
	useState
} from 'react'

import { useBoolean, useComposeRef, useControllable, useEvent, useLatestRef, useMount } from '@youknown/react-hook/src'
import { cls, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Tooltip from '../tooltip'

const toPercent = (num: number) => {
	return `${Math.round(num * 100)}%`
}

interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	disabled?: boolean
	vertical?: boolean
	tooltipFormatter?: (value: number) => string
	min?: number
	max?: number
	step?: number
	value?: number
	defaultValue?: number
	onChange?: (value: number) => void
}

const Slider = (props: SliderProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const {
		className,
		vertical = false,
		disabled = false,
		tooltipFormatter = (x: number) => String(Math.round(x)),
		min = 0,
		max = 100,
		step = 5,
		onClick,
		...rest
	} = omit(props, 'value', 'defaultValue', 'onChange')

	const [value, setValue] = useControllable(props, {
		defaultValue: min
	})
	const [dragging, { setTrue: start_drag, setFalse: stop_drag }] = useBoolean(false)
	const draggingRef = useLatestRef(dragging)
	const defaultPercent = toPercent(value / (max - min))
	const [left, setLeft] = useState(defaultPercent)
	const [bottom, setBottom] = useState(defaultPercent)
	const trackRef = useRef<HTMLDivElement>(null)
	const ref = useComposeRef(trackRef, propRef)

	const onDragEvents = () => {
		document.addEventListener('mousemove', handleMousemove)
		document.addEventListener('mouseup', handleMouseup, { once: true })
	}

	const offDragEvents = () => {
		document.removeEventListener('mousemove', handleMousemove)
		document.removeEventListener('mouseup', handleMouseup)
	}

	const handleMousedown = () => {
		if (disabled) {
			return
		}
		start_drag()
		onDragEvents()
	}

	const updateLeft = useEvent((percent: number) => {
		if (percent < 0) {
			setValue(min)
			setLeft('0%')
			return
		}
		if (percent > 1) {
			setValue(max)
			setLeft('100%')
			return
		}
		const range = max - min
		const nextValue = percent * range + min
		setValue(nextValue)
		setLeft(toPercent(percent))
	})

	const updateBottom = useEvent((percent: number) => {
		if (percent < 0) {
			setValue(min)
			setBottom('0%')
			return
		}
		if (percent > 1) {
			setValue(max)
			setBottom('100%')
			return
		}
		const range = max - min
		const nextValue = percent * range + min
		setValue(nextValue)
		setBottom(toPercent(percent))
	})

	const updateLeftByClientX = (clientX: number) => {
		if (!trackRef.current) return
		const { width, x } = trackRef.current.getBoundingClientRect()
		const offsetX = clientX - x

		updateLeft(offsetX / width)
	}

	const updateBottomByClientY = (clientY: number) => {
		if (!trackRef.current) return
		const { height, y } = trackRef.current.getBoundingClientRect()
		const offsetY = clientY - y

		updateBottom(1 - offsetY / height)
	}

	const handleMousemove = (event: MouseEvent) => {
		if (!draggingRef.current) return

		if (vertical) {
			updateBottomByClientY(event.clientY)
		} else {
			updateLeftByClientX(event.clientX)
		}
	}

	const handleMouseup = () => {
		stop_drag()
		offDragEvents()
	}

	const handleClick: MouseEventHandler<HTMLDivElement> = event => {
		if (disabled) {
			return
		}
		onClick?.(event)
		if (vertical) {
			updateBottomByClientY(event.clientY)
		} else {
			updateLeftByClientX(event.clientX)
		}
	}

	const handleKeydown: KeyboardEventHandler<HTMLButtonElement> = event => {
		if (!trackRef.current) return
		const percent = (value - min) / (max - min)
		switch (event.code) {
			case 'ArrowLeft':
				updateLeft(percent - step / 100)
				break
			case 'ArrowRight':
				updateLeft(percent + step / 100)
				break
			case 'ArrowUp':
				updateBottom(percent + step / 100)
				break
			case 'ArrowDown':
				updateBottom(percent - step / 100)
				break
			default:
				break
		}
	}

	useLayoutEffect(() => {
		updateLeft((value - min) / (max - min))
		updateBottom((value - min) / (max - min))
	}, [max, min, updateBottom, updateLeft, value])

	let offsetStyle = {}
	if (vertical) {
		offsetStyle = { height: bottom }
	} else {
		offsetStyle = { width: left }
	}
	let handleStyle = {}
	if (vertical) {
		handleStyle = { bottom }
	} else {
		handleStyle = { left }
	}
	const tooltipProps = dragging ? { open: dragging } : {}
	const prefixCls = `${UI_PREFIX}-slider`

	return (
		<div
			ref={ref}
			className={cls(className, prefixCls, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-vertical`]: vertical
			})}
			onClick={handleClick}
			{...rest}
		>
			<div className={cls(`${prefixCls}-offset`)} style={offsetStyle}></div>
			<Tooltip title={tooltipFormatter(value)} {...tooltipProps}>
				<button
					className={cls(`${prefixCls}-handle`)}
					style={handleStyle}
					onMouseDown={handleMousedown}
					onKeyDown={handleKeydown}
				></button>
			</Tooltip>
		</div>
	)
}

Slider.displayName = 'Slider'

export default forwardRef(Slider)