import './index.scss'

import { CgArrowsMergeAltH } from 'react-icons/cg'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function CellMergeBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const disabled = !editor.can().mergeCells()
	if (disabled) {
		return null
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-cell-merge-btn`
	return (
		<CommandBtn
			tooltip="合并单元格"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			onCommand={() => {
				editor.chain().focus().mergeCells().run()
			}}
		>
			<CgArrowsMergeAltH />
		</CommandBtn>
	)
}
