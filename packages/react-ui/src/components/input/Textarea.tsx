import './textarea.scss'

import {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	MutableRefObject,
	TextareaHTMLAttributes,
	useRef,
	useState
} from 'react'
import TextareaAutosize, { TextareaHeightChangeMeta } from 'react-textarea-autosize'

import { useBoolean, useComposeRef } from '@youknown/react-hook/src'
import { cls, is } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	autosize?: boolean
	minRows?: number
	maxRows?: number
	disabled?: boolean
	bordered?: boolean
	outline?: boolean
	value?: string | number
	onChange?: ChangeEventHandler<HTMLTextAreaElement> & ((value?: string | number) => void)
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, propRef) => {
	const {
		className,
		autosize = false,
		disabled = false,
		bordered = true,
		outline = true,
		minRows = 1,
		maxRows = Infinity,
		defaultValue,
		value,
		onChange,
		onFocus,
		onBlur,
		...rest
	} = props

	const innerRef = useRef<HTMLTextAreaElement>(null)
	const textareaRef = useComposeRef(propRef, innerRef) as MutableRefObject<null>
	const [focus, { setTrue: setFocus, setFalse: setBlur }] = useBoolean(false)
	const [lockScroll, setLockScroll] = useState(false)
	const isControlled = !is.undefined(value)

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
		if (isControlled) onChange?.(event.target.value)
		else onChange?.(event)
	}

	const handleFocus: FocusEventHandler<HTMLTextAreaElement> = event => {
		onFocus?.(event)
		setFocus()
	}

	const handleBlur: FocusEventHandler<HTMLTextAreaElement> = event => {
		onBlur?.(event)
		setBlur()
	}

	const TextareaComp = autosize ? TextareaAutosize : 'textarea'
	const valueProps = isControlled ? { value } : { defaultValue }
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
				{...valueProps}
				{...autosizeProps}
				{...(rest as any)}
				className={cls(`${prefixCls}-inner`, {
					[`${prefixCls}-inner-lock-scroll`]: lockScroll
				})}
				ref={textareaRef}
				disabled={disabled}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			></TextareaComp>
		</label>
	)
})
Textarea.displayName = 'Textarea'
export default Textarea
