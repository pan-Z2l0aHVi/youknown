import './switch.scss'

import { ChangeEventHandler, forwardRef, LabelHTMLAttributes, useRef } from 'react'

import { useComposeRef, useControllable } from '@youknown/react-hook/src'
import { cls, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'

interface SwitchProps extends Omit<LabelHTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: (value: boolean) => void
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, propRef) => {
	const { className, size = 'medium', disabled = false, ...rest } = omit(props, 'defaultValue', 'value', 'onChange')

	const [checked, setChecked] = useControllable(props, {
		defaultValue: false
	})
	const innerRef = useRef<HTMLInputElement>(null)
	const switchRef = useComposeRef(innerRef, propRef)

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		setChecked(event.target.checked)
	}

	const prefixCls = `${UI_PREFIX}-switch`

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
				role="switch"
				aria-checked={checked}
				checked={checked}
				onChange={handleChange}
			/>
		</label>
	)
})
Switch.displayName = 'Switch'
export default Switch
