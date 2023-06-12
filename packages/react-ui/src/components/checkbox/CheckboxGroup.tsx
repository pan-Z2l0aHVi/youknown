import { cls, is } from '@youknown/utils/src'
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
import Checkbox from '.'
import { UI_PREFIX } from '../../constants'
import Space from '../space'
import './checkbox-group.scss'

interface CheckboxGroupProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
	defaultValue?: (string | number)[]
	value?: (string | number)[]
	options?: {
		label: string | number
		child: ReactNode
		disabled?: boolean
	}[]
	size?: 'small' | 'medium' | 'large'
	direction?: 'horizontal' | 'vertical'
	disabled?: boolean
	onChange?: (value: (string | number)[]) => void
}

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>((props, propRef) => {
	const {
		children,
		className,
		direction = 'horizontal',
		size = 'medium',
		options = [],
		disabled = false,
		defaultValue,
		value = [],
		onChange,
		...rest
	} = props

	const isControlled = is.undefined(defaultValue)

	const getHandleSubChange = (label?: string | number) => (subParam: ChangeEvent<HTMLInputElement> | boolean) => {
		if (is.undefined(label)) return

		let nextValue = value
		const hasChecked = value.includes(label)
		const subChecked = is.boolean(subParam) ? subParam : subParam.target.checked

		if (subChecked) {
			if (!hasChecked) {
				nextValue.push(label)
			}
		} else {
			if (hasChecked) {
				nextValue = nextValue.filter(item => item !== label)
			}
		}
		onChange?.(nextValue)
	}

	const getValueProps = (label?: string | number) => {
		if (is.undefined(label)) return

		if (isControlled) return { value: value.includes(label) }

		return { defaultValue: defaultValue.includes(label) }
	}

	const prefixCls = `${UI_PREFIX}-checkbox-group`

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-disabled`]: disabled
			})}
			{...rest}
		>
			<Space direction={direction}>
				{options.map(option => {
					return (
						<Checkbox
							key={option.label}
							label={option.label}
							size={size}
							disabled={disabled || option.disabled}
							onChange={getHandleSubChange(option.label)}
							{...getValueProps(option.label)}
						>
							{option.child}
						</Checkbox>
					)
				})}
				{Children.map(children, child =>
					isValidElement<ComponentProps<typeof Checkbox>>(child)
						? cloneElement(child, {
								size,
								disabled: disabled || child.props.disabled,
								onChange: getHandleSubChange(child.props.label),
								...getValueProps(child.props.label)
						  })
						: child
				)}
			</Space>
		</div>
	)
})
CheckboxGroup.displayName = 'CheckboxGroup'
export default CheckboxGroup
