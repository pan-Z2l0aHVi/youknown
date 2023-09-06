import './index.scss'

import { CgArrowsShrinkH } from 'react-icons/cg'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function CellSplitBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const disabled = !editor.can().splitCell()
	if (disabled) {
		return null
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-cell-split-btn`
	return (
		<CommandBtn
			tooltip="拆分单元格"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			onCommand={() => {
				editor.chain().focus().splitCell().run()
			}}
		>
			<CgArrowsShrinkH />
		</CommandBtn>
	)
}
