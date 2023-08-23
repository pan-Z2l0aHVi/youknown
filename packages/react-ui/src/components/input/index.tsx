import './input.scss'

import {
	ChangeEventHandler,
	FocusEventHandler,
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
	KeyboardEventHandler,
	MouseEventHandler,
	MutableRefObject,
	ReactNode,
	useEffect,
	useLayoutEffect,
	useRef
} from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

import { useBoolean, useComposeRef, useControllable } from '@youknown/react-hook/src'
import { cls, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Textarea from './Textarea'

interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'maxLength' | 'onChange' | 'prefix'> {
	value?: string
	size?: 'small' | 'medium' | 'large'
	round?: boolean
	bordered?: boolean
	outline?: boolean
	disabled?: boolean
	prefix?: ReactNode
	suffix?: ReactNode
	allowClear?: boolean
	autoFocus?: boolean
	onChange?: (value: string) => void
	onEnter?: (value: string) => void
}

const Input = (props: InputProps, propRef: ForwardedRef<HTMLInputElement>) => {
	const {
		className,
		prefix,
		suffix,
		size = 'medium',
		round = false,
		disabled = false,
		allowClear = false,
		autoFocus = false,
		bordered = true,
		outline = true,
		onFocus,
		onBlur,
		onEnter,
		onKeyDown,
		...rest
	} = omit(props, 'defaultValue', 'value', 'onChange')

	const ref = useRef<HTMLInputElement>(null)
	const inputRef = useComposeRef(ref, propRef) as MutableRefObject<HTMLInputElement>
	const [focus, { setTrue: setFocus, setFalse: setBlur }] = useBoolean(false)
	const [clearVisible, { setTrue: showClear, setFalse: hideClear, setBool: setClearVisible }] = useBoolean(false)
	const [value, setValue] = useControllable(props, {
		defaultValue: ''
	})
	useEffect(() => {
		if (value) {
			showClear()
		}
	}, [value, showClear])

	const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
		onFocus?.(event)
		setFocus()
	}

	const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
		onBlur?.(event)
		setBlur()
	}

	const handleKeydown: KeyboardEventHandler<HTMLInputElement> = event => {
		onKeyDown?.(event)
		if (event.key === 'Enter') {
			onEnter?.(value)
		}
	}

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		const { value } = event.target
		setValue(value)
		setClearVisible(!!value)
	}

	const handleClear = () => {
		setValue('')
		hideClear()
	}

	const handleMouseDown: MouseEventHandler<SVGElement> = event => {
		if (event.target instanceof Element) {
			if (event.target.tagName !== 'INPUT') event.preventDefault()
		}
	}

	useLayoutEffect(() => {
		if (autoFocus) {
			inputRef.current.focus()
			setFocus()
		}
	}, [autoFocus, inputRef, setFocus])

	const prefixCls = `${UI_PREFIX}-input`

	return (
		<label
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-focus`]: focus,
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-bordered`]: bordered,
				[`${prefixCls}-outline`]: outline,
				[`${prefixCls}-disabled`]: disabled
			})}
		>
			{prefix}
			<input
				{...rest}
				disabled={disabled}
				className={`${prefixCls}-inner`}
				ref={inputRef}
				// 去除 size=20 最小宽度
				size={1}
				type="text"
				value={value}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeydown}
			/>
			{allowClear && (
				<IoMdCloseCircle
					className={`${prefixCls}-clear-icon`}
					style={{ visibility: focus && clearVisible ? 'initial' : 'hidden' }}
					onClick={handleClear}
					onMouseDown={handleMouseDown}
				/>
			)}
			{suffix}
		</label>
	)
}
Input.displayName = 'Input'

const RefInput = forwardRef(Input)
const ExportInput = RefInput as typeof RefInput & {
	Textarea: typeof Textarea
}
ExportInput.Textarea = Textarea

export default ExportInput
