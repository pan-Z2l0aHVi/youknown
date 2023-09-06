import './index.scss'

import { TbArrowBackUp } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function UndoBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-undo-btn`
	return (
		<CommandBtn
			tooltip="撤销"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			disabled={!editor.can().undo()}
			onCommand={() => {
				editor.chain().focus().undo().run()
			}}
		>
			<TbArrowBackUp />
		</CommandBtn>
	)
}
