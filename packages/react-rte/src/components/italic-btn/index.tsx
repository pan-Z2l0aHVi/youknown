import './index.scss'

import { PiTextItalicBold } from 'react-icons/pi'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function ItalicBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-italic-btn`
	return (
		<CommandBtn
			tooltip="斜体"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			active={editor.isActive('italic')}
			disabled={!editor.can().toggleItalic()}
			onCommand={() => {
				editor.chain().focus().toggleItalic().run()
			}}
		>
			<PiTextItalicBold />
		</CommandBtn>
	)
}
