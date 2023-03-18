import { useComposeRef } from '@youknown/react-hook/src'
import { cls, is } from '@youknown/utils/src'
import React, { ChangeEventHandler, forwardRef, LabelHTMLAttributes, useEffect, useRef, useState } from 'react'
import { UI_PREFIX } from '../../constants'
import './switch.scss'

interface SwitchProps extends Omit<LabelHTMLAttributes<HTMLElement>, 'defaultValue'> {
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value?: boolean) => void)
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, propRef) => {
	const { className, size = 'medium', disabled = false, defaultValue, value = false, onChange, ...rest } = props

	const isControlled = is.undefined(defaultValue)
	const innerRef = useRef<HTMLInputElement>(null)
	const switchRef = useComposeRef(innerRef, propRef)
	const defaultChecked = isControlled ? value : defaultValue ?? false
	const [checked, setChecked] = useState(defaultChecked)

	useEffect(() => {
		if (isControlled) setChecked(value)
	}, [isControlled, value])

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		setChecked(event.target.checked)
		if (isControlled) onChange?.(event.target.checked)
		else onChange?.(event)
	}

	const prefixCls = `${UI_PREFIX}-switch`

	const checkedProps = isControlled ? { defaultChecked: true } : { defaultChecked: true }

	return (
		<label
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-checked`]: checked
			})}
			{...rest}
		>
			<input
				className={`${prefixCls}-inner`}
				ref={switchRef}
				type="checkbox"
				disabled={disabled}
				onChange={handleChange}
				role="switch"
				aria-checked={checked}
				{...checkedProps}
			/>
		</label>
	)
})
Switch.displayName = 'Switch'
export default Switch
