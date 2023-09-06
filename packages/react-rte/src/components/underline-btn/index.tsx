import './index.scss'

import { PiTextUnderlineBold } from 'react-icons/pi'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function UnderlineBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-underline-btn`
	return (
		<CommandBtn
			className={cls(prefixCls)}
			tooltip="下划线"
			tooltipDisabled={!tooltip}
			active={editor.isActive('underline')}
			disabled={!editor.can().toggleUnderline()}
			onCommand={() => {
				editor.chain().focus().toggleUnderline().run()
			}}
		>
			<PiTextUnderlineBold />
		</CommandBtn>
	)
}
