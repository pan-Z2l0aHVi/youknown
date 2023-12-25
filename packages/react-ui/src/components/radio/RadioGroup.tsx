import './radio-group.scss'

import {
	Children,
	cloneElement,
	ComponentProps,
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
	isValidElement,
	ReactNode
} from 'react'

import { useControllable } from '@youknown/react-hook/src'
import { cls, is, omit } from '@youknown/utils/src'

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

const RadioGroup = (props: RadioGroupProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const {
		children,
		className,
		direction = 'horizontal',
		size = 'medium',
		options = [],
		disabled = false,
		...rest
	} = omit(props, 'defaultValue', 'value', 'onChange')

	const [value, setValue] = useControllable(props)

	const getHandleSubChange = (label?: string | number) => (subChecked: boolean) => {
		if (is.undefined(label)) {
			return
		}
		if (subChecked) {
			setValue?.(label)
		}
	}

	const prefixCls = `${UI_PREFIX}-radio-group`

	const radiosEle = (
		<>
			{options.map(option => {
				return (
					<Radio
						key={option.label}
						label={option.label}
						size={size}
						disabled={disabled || option.disabled}
						value={value === option.label}
						onChange={getHandleSubChange(option.label)}
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
							value: value === child.props.label,
							onChange: getHandleSubChange(child.props.label)
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
}
RadioGroup.displayName = 'RadioGroup'
export default forwardRef(RadioGroup)
