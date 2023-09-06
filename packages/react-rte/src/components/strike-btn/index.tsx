import './index.scss'

import { PiTextStrikethroughBold } from 'react-icons/pi'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function StrikeBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-strike-btn`
	return (
		<CommandBtn
			className={cls(prefixCls)}
			tooltip="删除线"
			tooltipDisabled={!tooltip}
			active={editor.isActive('strike')}
			disabled={!editor.can().toggleStrike()}
			onCommand={() => {
				editor.chain().focus().toggleStrike().run()
			}}
		>
			<PiTextStrikethroughBold />
		</CommandBtn>
	)
}
