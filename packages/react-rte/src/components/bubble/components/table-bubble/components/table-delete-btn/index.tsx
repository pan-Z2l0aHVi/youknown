import './index.scss'

import { TbTableOff } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function CellMergeBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const disabled = !editor.can().deleteTable()
	if (disabled) {
		return null
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-table-delete-btn`
	return (
		<CommandBtn
			tooltip="删除表格"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			onCommand={() => {
				editor.chain().focus().deleteTable().run()
			}}
		>
			<TbTableOff />
		</CommandBtn>
	)
}
