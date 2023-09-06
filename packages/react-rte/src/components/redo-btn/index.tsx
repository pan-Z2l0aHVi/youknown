import './index.scss'

import { TbArrowForwardUp } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function RedoBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-redo-btn`
	return (
		<CommandBtn
			className={cls(prefixCls)}
			tooltip="重做"
			tooltipDisabled={!tooltip}
			disabled={!editor.can().redo()}
			onCommand={() => {
				editor.chain().focus().redo().run()
			}}
		>
			<TbArrowForwardUp />
		</CommandBtn>
	)
}
