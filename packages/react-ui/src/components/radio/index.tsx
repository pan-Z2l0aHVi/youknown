import './radio.scss'

import { ChangeEventHandler, forwardRef, LabelHTMLAttributes, useRef } from 'react'

import { useComposeRef, useControllable } from '@youknown/react-hook/src'
import { cls, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import RadioGroup from './RadioGroup'

interface RadioProps extends Omit<LabelHTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	label?: string | number
	defaultValue?: boolean
	value?: boolean
	onChange?: (value: boolean) => void
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, propRef) => {
	const {
		className,
		children,
		size = 'medium',
		disabled = false,
		...rest
	} = omit(props, 'defaultValue', 'value', 'onChange')

	const innerRef = useRef<HTMLInputElement>(null)
	const radioRef = useComposeRef(innerRef, propRef)
	const [checked, setChecked] = useControllable<boolean>(props, {
		defaultValue: false
	})

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		setChecked(event.target.checked)
	}

	const prefixCls = `${UI_PREFIX}-radio`

	const radioCls = cls(className, prefixCls, `${prefixCls}-${size}`, {
		[`${prefixCls}-disabled`]: disabled,
		[`${prefixCls}-checked`]: checked
	})

	return (
		<label className={radioCls} {...rest}>
			<input
				disabled={disabled}
				className={`${prefixCls}-inner`}
				ref={radioRef}
				type="radio"
				aria-checked={checked}
				checked={checked}
				onChange={handleChange}
			/>
			<div className={`${prefixCls}-icon`}></div>
			{children}
		</label>
	)
})

Radio.displayName = 'Radio'
const ExportRadio = Radio as typeof Radio & {
	Group: typeof RadioGroup
}
ExportRadio.Group = RadioGroup

export default ExportRadio
