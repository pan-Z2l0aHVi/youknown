import { cls, is } from '@youknown/utils/src'
import { GoCheck } from 'react-icons/go'
import React, {
	ChangeEventHandler,
	forwardRef,
	InputHTMLAttributes,
	MutableRefObject,
	useEffect,
	useRef,
	useState
} from 'react'
import './checkbox.scss'
import CheckboxGroup from './CheckboxGroup'
import { UI_PREFIX } from '../../constants'

interface CheckboxProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'defaultValue' | 'defaultChecked' | 'checked' | 'value' | 'size'
	> {
	size?: 'small' | 'medium' | 'large'
	label?: string | number
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: boolean) => void)
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, propRef) => {
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

	const ref = useRef<HTMLInputElement>(null)
	const checkboxRef = (propRef ?? ref) as MutableRefObject<HTMLInputElement>
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

	const prefixCls = `${UI_PREFIX}-checkbox`
	const checkedProps = isControlled ? { checked } : { defaultChecked: defaultValue }

	return (
		<label
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-checked`]: checked
			})}
		>
			<input
				{...rest}
				{...checkedProps}
				hidden
				disabled={disabled}
				className={`${prefixCls}-input`}
				ref={checkboxRef}
				type="checkbox"
				onChange={handleChange}
			/>
			<div className={`${prefixCls}-icon`}>
				<GoCheck className={cls(`${prefixCls}-icon-inner`, `${prefixCls}-icon-inner-${size}`)} />
			</div>
			{children}
		</label>
	)
})
Checkbox.displayName = 'CHheckbox'

const ExportCheckbox = Checkbox as typeof Checkbox & {
	Group: typeof CheckboxGroup
}
ExportCheckbox.Group = CheckboxGroup

export default ExportCheckbox
