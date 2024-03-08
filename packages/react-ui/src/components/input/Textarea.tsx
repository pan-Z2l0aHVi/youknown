import './textarea.scss'

import { useBoolean, useComposeRef, useControllable } from '@youknown/react-hook/src'
import { cls, omit } from '@youknown/utils/src'
import {
	ChangeEventHandler,
	ComponentProps,
	FocusEventHandler,
	ForwardedRef,
	forwardRef,
	KeyboardEventHandler,
	TextareaHTMLAttributes,
	useRef,
	useState
} from 'react'
import TextareaAutosize, { TextareaHeightChangeMeta } from 'react-textarea-autosize'

import { UI_PREFIX } from '../../constants'

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
	autosize?: boolean
	minRows?: number
	maxRows?: number
	disabled?: boolean
	autoFocus?: boolean
	bordered?: boolean
	outline?: boolean
	value?: string
	onChange?: (value: string) => void
	onEnter?: (value: string) => void
}

const Textarea = (props: TextareaProps, propRef: ForwardedRef<HTMLTextAreaElement>) => {
	const {
		className,
		autosize = false,
		disabled = false,
		autoFocus = false,
		bordered = true,
		outline = true,
		minRows = 1,
		maxRows = Infinity,
		onFocus,
		onBlur,
		onEnter,
		onKeyDown,
		...rest
	} = omit(props, 'defaultValue', 'value', 'onChange')

	const innerRef = useRef<HTMLTextAreaElement>(null)
	const hasFocusedRef = useRef(false)
	const textareaRef = useComposeRef(propRef, innerRef, node => {
		// 当输入元素被渲染后，聚焦
		if (autoFocus && !hasFocusedRef.current) {
			hasFocusedRef.current = true
			setTimeout(() => {
				node?.focus()
			})
		}
	})
	const [focus, { setTrue: setFocus, setFalse: setBlur }] = useBoolean(false)
	const [lockScroll, setLockScroll] = useState(false)
	const [value, setValue] = useControllable(props, {
		defaultValue: ''
	})

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
		setValue(event.target.value)
	}

	const handleFocus: FocusEventHandler<HTMLTextAreaElement> = event => {
		onFocus?.(event)
		setFocus()
	}

	const handleBlur: FocusEventHandler<HTMLTextAreaElement> = event => {
		onBlur?.(event)
		setBlur()
	}

	const handleKeydown: KeyboardEventHandler<HTMLTextAreaElement> = event => {
		onKeyDown?.(event)
		if (event.key === 'Enter') {
			onEnter?.(value)
		}
	}

	const TextareaComp = autosize ? TextareaAutosize : 'textarea'
	const autosizeProps = autosize
		? {
				minRows,
				maxRows,
				onHeightChange(height: number, { rowHeight }: TextareaHeightChangeMeta) {
					setLockScroll(Math.ceil(height / rowHeight) < maxRows)
				}
			}
		: {}

	const prefixCls = `${UI_PREFIX}-textarea`

	return (
		<label
			className={cls(className, prefixCls, {
				[`${prefixCls}-focus`]: focus,
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-bordered`]: bordered,
				[`${prefixCls}-outline`]: outline
			})}
		>
			<TextareaComp
				{...autosizeProps}
				{...(rest as ComponentProps<typeof TextareaAutosize>)}
				className={cls(`${prefixCls}-inner`, {
					[`${prefixCls}-inner-lock-scroll`]: lockScroll
				})}
				ref={textareaRef}
				disabled={disabled}
				value={value}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeydown}
			></TextareaComp>
		</label>
	)
}
Textarea.displayName = 'Textarea'

export default forwardRef(Textarea)
