import './index.scss'

import { GoChevronDown } from 'react-icons/go'
import { TbCirclePlus } from 'react-icons/tb'

import { useBoolean } from '@youknown/react-hook/src'
import { Divider, Dropdown, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { UI_EDITOR_PREFIX } from '../../constants'
import CodeBlock from '../code-block'
import HorizontalDivider from '../horizontal-divider'
import ImgPicker from '../img-picker'
import LinkItem from '../link-item'
import TablePicker from '../table-picker'

export default function Insert() {
	const [open, { setBool: setOpen }] = useBoolean(false)
	const prefixCls = `${UI_EDITOR_PREFIX}-insert`
	return (
		<Dropdown
			trigger="click"
			onOpenChange={setOpen}
			content={
				<Dropdown.Menu className={`${prefixCls}-dropdown`}>
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
					className={cls(`${prefixCls}-btn`, {
						active: open
					})}
				>
					<TbCirclePlus className={`${prefixCls}-icon`} />
					<div className={`${prefixCls}-arrow`}>
						<GoChevronDown />
					</div>
				</div>
			</Tooltip>
		</Dropdown>
	)
}
