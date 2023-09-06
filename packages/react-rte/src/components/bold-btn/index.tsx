import './index.scss'

import { PiTextBBold } from 'react-icons/pi'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function BoldBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-bold-btn`
	return (
		<CommandBtn
			className={cls(prefixCls)}
			tooltip="粗体"
			tooltipDisabled={!tooltip}
			active={editor.isActive('bold')}
			disabled={!editor.can().toggleBold()}
			onCommand={() => {
				editor.chain().focus().toggleBold().run()
			}}
		>
			<PiTextBBold />
		</CommandBtn>
	)
}
