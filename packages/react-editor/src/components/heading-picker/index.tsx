import { useBoolean } from '@youknown/react-hook/src'
import { Dropdown, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { createElement, useContext } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { TbCheck } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function HeadingPicker() {
	const { editor } = useContext(ToolbarContext)
	type HeadingLevel = 1 | 2 | 3 | 4
	interface Option {
		value: 0 | HeadingLevel
		label: string
		tagName: string
	}
	const options: Option[] = [
		{
			value: 1,
			label: '标题 1',
			tagName: 'h1'
		},
		{
			value: 2,
			label: '标题 2',
			tagName: 'h2'
		},
		{
			value: 3,
			label: '标题 3',
			tagName: 'h3'
		},
		{
			value: 4,
			label: '标题 4',
			tagName: 'h4'
		},
		{
			value: 0,
			label: '正文',
			tagName: 'span'
		}
	]
	const [open, { setBool: setOpen }] = useBoolean(false)

	let selection = options.find(opt => opt.value === 0)!
	for (const opt of options) {
		if (editor.isActive('heading', { level: opt.value })) {
			selection = opt
			break
		}
	}

	const isMainText = (value: Option['value']): value is 0 => value === 0
	const isHeadingDisabled = !isMainText(selection.value) && !editor.can().setHeading({ level: selection.value })

	const handleSelect = (opt: Option) => {
		const level = opt.value
		if (!isMainText(level)) {
			editor.chain().focus().setHeading({ level }).run()
		} else if (!isMainText(selection.value)) {
			editor.chain().focus().toggleHeading({ level: selection.value }).run()
		}
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-heading-picker`
	return (
		<Dropdown
			disabled={isHeadingDisabled}
			trigger="click"
			onOpenChange={setOpen}
			content={
				<Dropdown.Menu className={`${prefixCls}-dropdown`}>
					{options.map(opt => {
						const heading = createElement(opt.tagName, {}, opt.label)
						const active = selection.value === opt.value
						return (
							<Dropdown.Item
								key={opt.value}
								className={`${prefixCls}-dropdown-item`}
								prefix={
									active ? (
										<TbCheck className={`${prefixCls}-dropdown-item-icon`} />
									) : (
										<div className={`${prefixCls}-dropdown-item-icon`}></div>
									)
								}
								closeAfterItemClick
								onClick={() => handleSelect(opt)}
							>
								{heading}
							</Dropdown.Item>
						)
					})}
				</Dropdown.Menu>
			}
		>
			<Tooltip placement="bottom" title="标题">
				<div
					className={cls(prefixCls, {
						active: open,
						disabled: isHeadingDisabled
					})}
				>
					<div className={`${prefixCls}-label`}>{selection.label}</div>
					<div className={`${prefixCls}-arrow`}>
						<GoChevronDown />
					</div>
				</div>
			</Tooltip>
		</Dropdown>
	)
}
