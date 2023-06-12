import { useComposeRef } from '@youknown/react-hook/src'
import { cls, is } from '@youknown/utils/src'
import { ChangeEventHandler, forwardRef, LabelHTMLAttributes, useEffect, useRef, useState } from 'react'
import { UI_PREFIX } from '../../constants'
import './radio.scss'
import RadioGroup from './RadioGroup'

interface RadioProps extends Omit<LabelHTMLAttributes<HTMLElement>, 'defaultValue'> {
	size?: 'small' | 'medium' | 'large'
	value?: boolean
	disabled?: boolean
	label?: string | number
	defaultValue?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: boolean) => void)
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, propRef) => {
	const {
		className,
		children,
		size = 'medium',
		value,
		onChange,
		disabled = false,
		defaultValue = false,
		...rest
	} = props

	const isControlled = !is.undefined(value)

	const innerRef = useRef<HTMLInputElement>(null)
	const radioRef = useComposeRef(innerRef, propRef)
	const [checked, setChecked] = useState(isControlled ? value : defaultValue)

	useEffect(() => {
		if (isControlled) setChecked(value)
	}, [isControlled, value])

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		setChecked(event.target.checked)
		if (isControlled) {
			onChange?.(event.target.checked)
		} else {
			onChange?.(event)
		}
	}

	const prefixCls = `${UI_PREFIX}-radio`

	const checkedProps = isControlled ? { checked } : { defaultChecked: defaultValue }

	const radioCls = cls(className, prefixCls, `${prefixCls}-${size}`, {
		[`${prefixCls}-disabled`]: disabled,
		[`${prefixCls}-checked`]: checked
	})

	return (
		<label className={radioCls} {...rest}>
			<input
				{...checkedProps}
				disabled={disabled}
				className={`${prefixCls}-inner`}
				ref={radioRef}
				type="radio"
				aria-checked={checked}
				onChange={handleChange}
			/>
			<div className={`${prefixCls}-icon`}></div>
			{children}
		</label>
	)
})

const ExportRadio = Radio as typeof Radio & {
	Group: typeof RadioGroup
}
ExportRadio.Group = RadioGroup

export default ExportRadio
