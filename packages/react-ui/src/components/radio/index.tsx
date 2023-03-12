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
import './radio.scss'
import RadioGroup from './RadioGroup'

interface RadioProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'defaultValue' | 'defaultChecked' | 'checked' | 'value' | 'size'
	> {
	size?: 'small' | 'medium' | 'large'
	value?: boolean
	disabled?: boolean
	type?: 'default' | 'tab'
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
		type = 'default',
		...rest
	} = props

	const isControlled = !is.undefined(value)

	const innerRef = useRef<HTMLInputElement>(null)
	const radioRef = (propRef ?? innerRef) as MutableRefObject<HTMLInputElement>
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
	const isTab = type === 'tab'
	const radioCls = isTab
		? cls(className, `${prefixCls}-tab`, `${prefixCls}-tab-${size}`, {
				[`${prefixCls}-tab-disabled`]: disabled,
				[`${prefixCls}-tab-checked`]: checked
		  })
		: cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-checked`]: checked
		  })

	return (
		<label className={radioCls}>
			<input
				{...rest}
				{...checkedProps}
				hidden
				disabled={disabled}
				className={`${prefixCls}-inner`}
				ref={radioRef}
				type="radio"
				onChange={handleChange}
			/>
			{!isTab && <div className={`${prefixCls}-icon`}></div>}
			{children}
		</label>
	)
})

const ExportRadio = Radio as typeof Radio & {
	Group: typeof RadioGroup
}
ExportRadio.Group = RadioGroup

export default ExportRadio
