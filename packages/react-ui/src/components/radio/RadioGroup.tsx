import './radio-group.scss'

import {
	ChangeEvent,
	Children,
	cloneElement,
	ComponentProps,
	forwardRef,
	HTMLAttributes,
	isValidElement,
	ReactNode
} from 'react'

import { cls, is } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Space from '../space'
import Radio from './'

interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
	size?: 'small' | 'medium' | 'large'
	defaultValue?: string | number
	value?: string | number
	options?: {
		label: string | number
		child: ReactNode
		disabled?: boolean
	}[]
	direction?: 'horizontal' | 'vertical'
	disabled?: boolean
	onChange?: (value: string | number) => void
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, propRef) => {
	const {
		children,
		className,
		direction = 'horizontal',
		size = 'medium',
		options = [],
		disabled = false,
		defaultValue,
		value,
		onChange,
		...rest
	} = props

	const getHandleSubChange = (label?: string | number) => (subParam: boolean | ChangeEvent<HTMLInputElement>) => {
		if (is.undefined(label)) return

		const subChecked = is.boolean(subParam) ? subParam : subParam.target.checked
		if (subChecked) {
			onChange?.(label)
		}
	}

	const prefixCls = `${UI_PREFIX}-radio-group`

	const isControlled = !is.undefined(value)

	const getValueProps = (label?: string | number) => {
		if (is.undefined(label)) return

		if (isControlled) return { value: value === label }

		return { defaultValue: defaultValue === label }
	}

	const radiosEle = (
		<>
			{options.map(option => {
				return (
					<Radio
						key={option.label}
						label={option.label}
						size={size}
						disabled={disabled || option.disabled}
						onChange={getHandleSubChange(option.label)}
						{...getValueProps(option.label)}
					>
						{option.child}
					</Radio>
				)
			})}
			{Children.map(children, child =>
				isValidElement<ComponentProps<typeof Radio>>(child)
					? cloneElement(child, {
							size,
							disabled: disabled || child.props.disabled,
							onChange: getHandleSubChange(child.props.label),
							...getValueProps(child.props.label)
					  })
					: child
			)}
		</>
	)

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-disabled`]: disabled
			})}
			{...rest}
		>
			<Space direction={direction}>{radiosEle}</Space>
		</div>
	)
})

export default RadioGroup
