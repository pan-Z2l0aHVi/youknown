import './index.scss'

import { TbExternalLink } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function LinkOpenBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-link-open-btn`
	return (
		<CommandBtn
			tooltip="打开链接"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			disabled={!editor.isActive('link')}
			onCommand={() => {
				const href = editor.getAttributes('link').href
				if (href) window.open(href)
			}}
		>
			<TbExternalLink />
		</CommandBtn>
	)
}
