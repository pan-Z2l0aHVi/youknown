import './checkbox-group.scss'

import { Children, cloneElement, ComponentProps, forwardRef, HTMLAttributes, isValidElement, ReactNode } from 'react'

import { useControllable } from '@youknown/react-hook/src'
import { cls, is, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Space from '../space'
import Checkbox from './'

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
		...rest
	} = omit(props, 'defaultValue', 'value', 'onChange')

	const [value, setValue] = useControllable<(string | number)[]>(props, {
		defaultValue: []
	})

	const getHandleSubChange = (label?: string | number) => (subChecked: boolean) => {
		if (is.undefined(label)) {
			return
		}
		setValue?.(p => {
			const hasChecked = p.includes(label)

			if (subChecked) {
				if (!hasChecked) {
					return [...p, label]
				}
			} else {
				if (hasChecked) {
					return p.filter(item => item !== label)
				}
			}
			return p
		})
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
							value={value.includes(option.label)}
							onChange={getHandleSubChange(option.label)}
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
								value: !!child.props.label && value.includes(child.props.label),
								onChange: getHandleSubChange(child.props.label)
						  })
						: child
				)}
			</Space>
		</div>
	)
})
CheckboxGroup.displayName = 'CheckboxGroup'
export default CheckboxGroup
