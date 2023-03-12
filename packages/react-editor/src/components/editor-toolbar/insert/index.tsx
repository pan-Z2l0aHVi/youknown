import { Divider, Dropdown, Tooltip } from '@youknown/react-ui/src'
import React, { useContext } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { GoChevronDown } from 'react-icons/go'
import CodeBlock from '../code-block'
import HorizontalDivider from '../horizontal-divider'
import ImgPicker from '../img-picker'
import LinkPicker from '../link-picker'
import TablePicker from '../table-picker'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Insert() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Dropdown
			trigger="click"
			content={
				<Dropdown.Menu className="g-insert-dropdown">
					<ImgPicker />
					<CodeBlock />
					<Divider size="small" />
					<TablePicker />
					<LinkPicker />
					<Divider size="small" />
					<HorizontalDivider />
				</Dropdown.Menu>
			}
		>
			<div>
				<Tooltip placement="bottom" title="插入">
					<div className="g-insert">
						<AiFillPlusCircle className="g-insert-icon" />
						<div className="g-insert-arrow">
							<GoChevronDown />
						</div>
					</div>
				</Tooltip>
			</div>
		</Dropdown>
	)
}
