import './index.scss'

import { TbLinkOff } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function UnLinkBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-unlink-btn`
	return (
		<CommandBtn
			className={cls(prefixCls)}
			tooltip="取消链接"
			tooltipDisabled={!tooltip}
			disabled={!editor.can().unsetLink()}
			onCommand={() => {
				editor.chain().unsetLink().focus().run()
			}}
		>
			<TbLinkOff />
		</CommandBtn>
	)
}
