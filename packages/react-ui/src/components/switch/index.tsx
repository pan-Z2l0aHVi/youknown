import { cls, is } from '@youknown/utils/src'
import React, {
	ChangeEventHandler,
	forwardRef,
	InputHTMLAttributes,
	MutableRefObject,
	useEffect,
	useRef,
	useState
} from 'react'
import { UI_PREFIX } from '../../constants'
import './switch.scss'

interface SwitchProps
	extends Omit<
		InputHTMLAttributes<HTMLElement>,
		'defaultValue' | 'value' | 'onChange' | 'checked' | 'defaultChecked' | 'size'
	> {
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value?: boolean) => void)
}

const Switch = forwardRef<HTMLLabelElement, SwitchProps>((props, propRef) => {
	const { className, size = 'medium', disabled = false, defaultValue, value = false, onChange, ...rest } = props

	const isControlled = is.undefined(defaultValue)
	const innerRef = useRef<HTMLInputElement>(null)
	const switchRef = (propRef ?? innerRef) as MutableRefObject<HTMLInputElement>
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

	const checkedProps = isControlled ? { checked } : { defaultChecked: defaultValue }

	return (
		<label
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-checked`]: checked
			})}
			{...rest}
		>
			<input
				className="g-inner"
				ref={switchRef}
				type="checkbox"
				hidden
				disabled={disabled}
				onChange={handleChange}
				{...checkedProps}
			/>
		</label>
	)
})
Switch.displayName = 'Switch'
export default Switch
