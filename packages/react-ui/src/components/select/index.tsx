import './select.scss'

import {
	CSSProperties,
	HTMLAttributes,
	KeyboardEvent,
	MouseEventHandler,
	ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react'
import { TbCheck, TbSelector } from 'react-icons/tb'

import { useBoolean, useControllable, useEvent, useIntersection, useLatestRef } from '@youknown/react-hook/src'
import { cls, is, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Dropdown from '../dropdown'
import Input from '../input'
import Loading from '../loading'
import Space from '../space'
import Tag from '../tag'

interface SelectProps<T> extends Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	multiple?: boolean
	disabled?: boolean
	filter?: boolean
	placeholder?: string
	allowClear?: boolean
	noMore?: boolean
	value?: T | T[]
	defaultValue?: T | T[]
	options?: { label: ReactNode; value: T; disabled?: boolean }[]
	onChange?: (value: T | T[]) => void
	onLoad?: () => void
}

const Select = <T extends string | number>(props: SelectProps<T>) => {
	const {
		className,
		multiple = false,
		disabled = false,
		filter = false,
		placeholder = '请选择',
		allowClear = false,
		noMore = true,
		options = [],
		onLoad,
		onClick,
		onKeyDown,
		...rest
	} = omit(props, 'defaultValue', 'value', 'onChange')

	const inputRef = useRef<HTMLInputElement>(null)
	const [
		dropdownVisible,
		{ setBool: setDropdownVisible, setReverse: toggleDropdown, setTrue: showDropdown, setFalse: hideDropdown }
	] = useBoolean(false)

	const [value, setValue] = useControllable(props, {
		defaultValue: (multiple ? [] : undefined) as T | T[]
	})
	const _valueRef = useLatestRef(value)

	const handleClick: MouseEventHandler<HTMLElement> = e => {
		if (disabled) return
		onClick?.(e)
		if (filter) {
			inputRef.current?.focus()
			return
		}
		toggleDropdown()
	}

	const handleClickOutside = () => {
		if (filter) return
		hideDropdown()
	}

	const [filterVal, setFilterVal] = useState('')

	const [minWidth, setMinWidth] = useState<CSSProperties['width']>('initial')
	const selectRef = useRef<HTMLButtonElement>(null)
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

		return String(opt.label).toLowerCase().includes(filterVal.toLowerCase())
	})

	const handleSelect = (val: T) => {
		if (multiple) {
			let selection = [...(_valueRef.current as T[])]
			if (selection.includes(val)) {
				selection = selection.filter(item => item !== val)
			} else {
				selection.push(val)
			}
			setValue(selection)
		} else {
			setValue(val)
			if (filter) {
				inputRef.current?.blur()
			} else {
				hideDropdown()
			}
		}

		if (filter) {
			setFilterVal('')
		}
	}

	const [selectedIndex, setSelectedIndex] = useState(-1)
	const enabledOptions = options.filter(opt => !opt.disabled)
	const selectedItem = enabledOptions[selectedIndex] ?? null
	const optionsLen = enabledOptions.length

	useEffect(() => {
		if (dropdownVisible) {
			setSelectedIndex(-1)
		}
	}, [dropdownVisible])

	const menuRef = useRef(null)
	const loadingRef = useRef(null)
	const isIntersection = useIntersection(loadingRef, {
		root: menuRef.current
	})
	const onLoadEvent = useEvent(() => onLoad?.())
	useEffect(() => {
		if (isIntersection) {
			onLoadEvent?.()
		}
	}, [isIntersection, onLoadEvent])

	const loadingEle = (
		<>
			{noMore || (
				<div ref={loadingRef} className={cls(`${prefixCls}-loading`)}>
					<Loading spinning size="small" />
				</div>
			)}
		</>
	)

	const dropdownContentEle = (
		<Dropdown.Menu
			ref={menuRef}
			style={{ minWidth }}
			onMouseLeave={() => {
				setSelectedIndex(-1)
			}}
		>
			{is.array.empty(filteredOptions) ? (
				<div className={`${prefixCls}-empty`}>暂无数据</div>
			) : (
				filteredOptions.map(opt => {
					let isActive: boolean
					if (multiple) {
						isActive = (value as (string | number)[]).includes(opt.value)
					} else {
						isActive = opt.value === value
					}
					return (
						<Dropdown.Item
							key={opt.value}
							className={cls({
								[`${prefixCls}-item-selected`]: selectedItem?.value === opt.value
							})}
							aria-selected={isActive}
							disabled={opt.disabled}
							prefix={
								isActive ? (
									<TbCheck className={`${prefixCls}-item-icon`} />
								) : (
									<div className={`${prefixCls}-item-icon`}></div>
								)
							}
							onClick={() => handleSelect(opt.value)}
							onMouseDown={event => {
								event.preventDefault()
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
			{loadingEle}
		</Dropdown.Menu>
	)

	const selectorCls = cls(`${prefixCls}-selector`)
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
					? is.array.empty(value)
						? placeholder
						: ''
					: String(options.find(opt => opt.value === value)?.label) || placeholder
			}
			allowClear={allowClear}
			value={filterVal}
			onChange={setFilterVal}
			onBlur={hideDropdown}
			onFocus={showDropdown}
			onKeyDown={event => {
				if (!filter || !multiple) return
				if (event.key === 'Backspace' && !filterVal) {
					event.preventDefault()
					setValue(p => {
						const selection = [...(p as T[])]
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
			{is.array.empty(value) ? (
				filter || placeholderEle
			) : (
				<Space className={`${prefixCls}-selector-tag-list`} size="small">
					{(options.filter(opt => (value as (string | number)[]).includes(opt.value)) || []).map(opt => (
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
				: is.undefined(value)
				  ? placeholderEle
				  : options.find(opt => opt.value === value)?.label}
		</div>
	)

	const handleKeydown = (event: KeyboardEvent<HTMLButtonElement>) => {
		onKeyDown?.(event)
		const RANGE_MIN = 0
		const RANGE_MAX = optionsLen - 1

		switch (event.key) {
			case 'ArrowUp':
				event.preventDefault()
				setSelectedIndex(p => {
					if (p - 1 < RANGE_MIN) {
						return RANGE_MAX
					}
					return Math.max(RANGE_MIN, p - 1)
				})
				break

			case 'ArrowDown':
				event.preventDefault()
				setSelectedIndex(p => {
					if (p + 1 > RANGE_MAX) {
						return RANGE_MIN
					}
					return p + 1
				})
				break

			case 'Enter':
				event.preventDefault()
				if (selectedItem) handleSelect(selectedItem.value)
				break

			case 'Escape':
			case 'Tab':
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

	return (
		<Dropdown
			trigger="manual"
			open={dropdownVisible}
			onOpenChange={setDropdownVisible}
			onClickOutside={handleClickOutside}
			content={dropdownContentEle}
			spacing={4}
		>
			{/* 加一层wrapper，防止影响计算宽度 */}
			<div style={{ width: 'max-content' }}>
				<button
					type="button"
					ref={selectRef}
					disabled={disabled}
					className={cls(className, prefixCls, {
						[`${prefixCls}-disabled`]: disabled
					})}
					onClick={handleClick}
					onKeyDown={handleKeydown}
					{...rest}
				>
					{selectorEle}
					<TbSelector className={`${prefixCls}-arrow`} />
				</button>
			</div>
		</Dropdown>
	)
}
Select.displayName = 'Select'
export default Select
