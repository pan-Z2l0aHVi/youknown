import React, {
	CSSProperties,
	FC,
	HTMLAttributes,
	MouseEventHandler,
	ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react'
import { cls, is } from '@youknown/utils/src'
import { UI_PREFIX } from '../../constants'
import './select.scss'
import Dropdown from '../dropdown'
import { useBoolean, useLatestRef } from '@youknown/react-hook/src'
import Tag from '../tag'
import Space from '../space'
import Input from '../input'
import { TbCheck, TbSelector } from 'react-icons/tb'

interface SelectProps extends Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	multiple?: boolean
	disabled?: boolean
	filter?: boolean
	placeholder?: string
	allowClear?: boolean
	value?: string | number | (string | number)[]
	defaultValue?: SelectProps['value']
	options?: { label: ReactNode; value: string | number }[]
	onChange?: (value: SelectProps['value']) => void
}

const Select: FC<SelectProps> = props => {
	const {
		className,
		multiple = false,
		disabled = false,
		filter = false,
		placeholder = '请选择',
		allowClear = false,
		defaultValue,
		value,
		options = [],
		onChange,
		onClick,
		...rest
	} = props

	const inputRef = useRef<HTMLInputElement>(null)
	const [
		dropdownVisible,
		{ setBool: setDropdownVisible, setReverse: toggleDropdown, setTrue: showDropdown, setFalse: hideDropdown }
	] = useBoolean(false)

	let _defaultValue
	const isControlled = is.undefined(defaultValue)
	if (isControlled) {
		_defaultValue = multiple ? value ?? [] : value
	} else {
		_defaultValue = multiple ? defaultValue ?? [] : defaultValue
	}
	const [_value, _setValue] = useState(_defaultValue)
	const _valueRef = useLatestRef(_value)

	useEffect(() => {
		if (disabled) return
		if (isControlled) _setValue(value)
	}, [disabled, isControlled, value])

	const handleCustomClick: MouseEventHandler<HTMLElement> = e => {
		if (disabled) return
		onClick?.(e)
		if (filter) return
		toggleDropdown()
	}

	const handleClickOutside = () => {
		if (filter) return
		hideDropdown()
	}

	const [filterVal, setFilterVal] = useState('')

	const [minWidth, setMinWidth] = useState<CSSProperties['width']>('initial')
	const selectRef = useRef<HTMLDivElement>(null)
	useLayoutEffect(() => {
		if (dropdownVisible) {
			const selectWidth = selectRef.current?.getBoundingClientRect().width
			if (!is.undefined(selectWidth)) {
				setMinWidth(selectRef.current?.offsetWidth)
			}
		} else {
		}
	}, [dropdownVisible])

	const prefixCls = `${UI_PREFIX}-select`

	const filteredOptions = options.filter(opt => {
		if (!filter) return true

		return String(opt.label).includes(filterVal)
	})

	const handleSelect = useCallback(
		(val: string | number) => {
			if (multiple) {
				let selection = [...(_valueRef.current as (string | number)[])]
				if (selection.includes(val)) {
					selection = selection.filter(item => item !== val)
				} else {
					selection.push(val)
				}
				if (!isControlled) {
					_setValue(selection)
				}
				onChange?.(selection)
			} else {
				if (!isControlled) {
					_setValue(val)
				}
				onChange?.(val)
				if (filter) {
					inputRef.current?.blur()
				} else {
					hideDropdown()
				}
			}

			if (filter) {
				setFilterVal('')
			}
		},
		[_valueRef, filter, hideDropdown, isControlled, multiple, onChange]
	)

	const [selectedIndex, setSelectedIndex] = useState(-1)
	const selectedItem = options[selectedIndex] ?? null
	const optionsLen = options.length

	useEffect(() => {
		if (dropdownVisible) {
			setSelectedIndex(-1)
		}
	}, [dropdownVisible])

	useEffect(() => {
		if (!dropdownVisible || !optionsLen) return

		const keydownHandler = (e: globalThis.KeyboardEvent) => {
			const RANGE_MIN = 0
			const RANGE_MAX = optionsLen - 1
			switch (e.key) {
				case 'ArrowUp':
					setSelectedIndex(p => {
						if (p - 1 < RANGE_MIN) {
							return RANGE_MIN - 1
						}
						return p - 1
					})
					break

				case 'ArrowDown':
					setSelectedIndex(p => {
						if (p + 1 > RANGE_MAX) {
							return RANGE_MAX + 1
						}
						return p + 1
					})
					break

				case 'Enter':
					handleSelect(selectedItem.value)
					break

				case 'Escape':
					if (filter) {
						inputRef.current?.blur()
					} else {
						hideDropdown()
					}
					break

				default:
					break
			}
		}
		document.addEventListener('keydown', keydownHandler)
		return () => {
			document.removeEventListener('keydown', keydownHandler)
		}
	}, [dropdownVisible, filter, handleSelect, hideDropdown, optionsLen, selectedItem])

	const dropdownContentEle = (
		<Dropdown.Menu
			style={{ minWidth }}
			onMouseLeave={() => {
				setSelectedIndex(-1)
			}}
		>
			{is.array.empty(filteredOptions) ? (
				<div className={`${prefixCls}-empty`}>暂无数据</div>
			) : (
				filteredOptions.map(opt => {
					let active: boolean
					if (multiple) {
						active = (_value as (string | number)[]).includes(opt.value)
					} else {
						active = opt.value === _value
					}

					return (
						<Dropdown.Item
							key={opt.value}
							className={cls({
								[`${prefixCls}-item-selected`]: selectedItem?.value === opt.value
							})}
							prefix={
								active ? (
									<TbCheck className={`${prefixCls}-item-icon`} />
								) : (
									<div className={`${prefixCls}-item-icon`}></div>
								)
							}
							onClick={() => handleSelect(opt.value)}
							onMouseDown={e => {
								e.preventDefault()
							}}
							onMouseEnter={() => {
								const index = options.findIndex(option => option.value === opt.value)
								if (index > -1) setSelectedIndex(index)
							}}
						>
							{opt.label}
						</Dropdown.Item>
					)
				})
			)}
		</Dropdown.Menu>
	)

	const selectorCls = cls(`${prefixCls}-selector`, {
		[`${prefixCls}-selector-no-margin`]: filter && !multiple
	})
	const filterEle = filter ? (
		<Input
			ref={inputRef}
			className={cls(`${prefixCls}-selector-filter`, {
				[`${prefixCls}-selector-filter-placeholder-darker`]: !multiple && !dropdownVisible
			})}
			bordered={false}
			size="small"
			placeholder={
				multiple
					? is.array.empty(_value)
						? placeholder
						: ''
					: String(options.find(opt => opt.value === _value)?.label) || placeholder
			}
			allowClear={allowClear}
			value={filterVal}
			onChange={val => {
				setFilterVal(val as string)
			}}
			onBlur={() => {
				hideDropdown()
			}}
			onFocus={() => {
				showDropdown()
			}}
			onKeyDown={e => {
				if (!filter || !multiple) return
				if (e.key === 'Backspace') {
					_setValue(p => {
						const selection = [...(p as (string | number)[])]
						selection.pop()
						return selection
					})
				}
			}}
		/>
	) : null

	const placeholderEle = <span className={`${prefixCls}-placeholder`}>{placeholder}</span>
	const selectorEle = multiple ? (
		<div className={selectorCls}>
			{is.array.empty(_value) ? (
				filter || placeholderEle
			) : (
				<Space
					size="small"
					onClick={() => {
						inputRef.current?.focus()
					}}
				>
					{(options.filter(opt => (_value as (string | number)[]).includes(opt.value)) || []).map(opt => (
						<Tag key={opt.value} size="small" bordered round>
							{opt.label}
						</Tag>
					))}
				</Space>
			)}
			{filterEle}
		</div>
	) : (
		<div className={selectorCls}>
			{filter
				? filterEle
				: is.undefined(_value)
				? placeholderEle
				: options.find(opt => opt.value === _value)?.label}
		</div>
	)

	return (
		<Dropdown
			trigger="manual"
			open={dropdownVisible}
			onOpenChange={setDropdownVisible}
			onClickOutside={handleClickOutside}
			content={dropdownContentEle}
		>
			{/* 加一层，防止影响计算宽度 */}
			<div>
				<div
					ref={selectRef}
					className={cls(className, prefixCls, {
						[`${prefixCls}-disabled`]: disabled
					})}
					onClick={handleCustomClick}
					{...rest}
				>
					{selectorEle}
					<TbSelector
						className={`${prefixCls}-arrow`}
						onClick={() => {
							if (filter) {
								inputRef.current?.focus()
							}
						}}
					/>
				</div>
			</div>
		</Dropdown>
	)
}
Select.displayName = 'Select'
export default Select
