import './index.scss'

import { HiCode } from 'react-icons/hi'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function CodeBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-code-btn`
	return (
		<CommandBtn
			className={cls(prefixCls)}
			tooltip="代码"
			tooltipDisabled={!tooltip}
			active={editor.isActive('code')}
			disabled={!editor.can().toggleCode()}
			onCommand={() => {
				editor.chain().focus().toggleCode().run()
			}}
		>
			<HiCode />
		</CommandBtn>
	)
}
