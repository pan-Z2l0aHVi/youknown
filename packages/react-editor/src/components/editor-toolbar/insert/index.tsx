import { useBoolean } from '@youknown/react-hook/src'
import { Divider, Dropdown, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React from 'react'
import { GoChevronDown } from 'react-icons/go'
import { TbCirclePlus } from 'react-icons/tb'
import CodeBlock from '../code-block'
import HorizontalDivider from '../horizontal-divider'
import ImgPicker from '../img-picker'
import LinkItem from '../link-item'
import TablePicker from '../table-picker'
import './index.scss'

export default function Insert() {
	const [open, { setBool: setOpen, setFalse: hide, setReverse: toggle }] = useBoolean(false)
	return (
		<Dropdown
			trigger="manual"
			open={open}
			onOpenChange={setOpen}
			onClickOutside={hide}
			content={
				<Dropdown.Menu className="g-insert-dropdown">
					<LinkItem />
					<CodeBlock />
					<Divider size="small" />
					<TablePicker />
					<ImgPicker />
					<Divider size="small" />
					<HorizontalDivider />
				</Dropdown.Menu>
			}
		>
			<Tooltip placement="bottom" title="插入">
				<div
					className={cls('g-insert', {
						active: open
					})}
					onClick={toggle}
				>
					<TbCirclePlus className="g-insert-icon" />
					<div className="g-insert-arrow">
						<GoChevronDown />
					</div>
				</div>
			</Tooltip>
		</Dropdown>
	)
}
