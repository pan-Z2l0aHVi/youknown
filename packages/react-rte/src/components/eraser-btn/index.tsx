import './index.scss'

import { TbEraser } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function EraserBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-eraser-btn`
	return (
		<CommandBtn
			className={cls(prefixCls)}
			tooltip="清除格式"
			tooltipDisabled={!tooltip}
			disabled={!editor.can().unsetAllMarks()}
			onCommand={() => {
				editor.chain().focus().clearNodes().unsetAllMarks().run()
			}}
		>
			<TbEraser />
		</CommandBtn>
	)
}
