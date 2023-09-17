import './checkbox.scss'

import { ChangeEventHandler, ForwardedRef, forwardRef, LabelHTMLAttributes, useRef } from 'react'
import { HiCheck } from 'react-icons/hi'

import { useComposeRef, useControllable } from '@youknown/react-hook/src'
import { cls, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import CheckboxGroup from './CheckboxGroup'

interface CheckboxProps extends Omit<LabelHTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	size?: 'small' | 'medium' | 'large'
	label?: string | number
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: (value: boolean) => void
}

const Checkbox = (props: CheckboxProps, propRef: ForwardedRef<HTMLInputElement>) => {
	const {
		className,
		children,
		size = 'medium',
		disabled = false,
		...rest
	} = omit(props, 'defaultValue', 'value', 'onChange')

	const innerRef = useRef<HTMLInputElement>(null)
	const checkboxRef = useComposeRef(innerRef, propRef)
	const [checked, setChecked] = useControllable<boolean>(props, {
		defaultValue: false
	})

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		setChecked(event.target.checked)
	}

	const prefixCls = `${UI_PREFIX}-checkbox`

	return (
		<label
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-checked`]: checked
			})}
			{...rest}
		>
			<input
				disabled={disabled}
				className={`${prefixCls}-input`}
				ref={checkboxRef}
				type="checkbox"
				aria-checked={checked}
				checked={checked}
				onChange={handleChange}
			/>
			<div className={`${prefixCls}-icon`}>
				<HiCheck className={cls(`${prefixCls}-icon-inner`)} />
			</div>
			{children}
		</label>
	)
}
Checkbox.displayName = 'Checkbox'

const RefCheckbox = forwardRef(Checkbox)
const ExportCheckbox = RefCheckbox as typeof RefCheckbox & {
	Group: typeof CheckboxGroup
}
ExportCheckbox.Group = CheckboxGroup

export default ExportCheckbox
