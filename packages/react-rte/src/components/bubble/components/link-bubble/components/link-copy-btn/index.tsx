import './index.scss'

import copy from 'copy-to-clipboard'
import { TbCopy } from 'react-icons/tb'

import { Toast } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function LinkCopyBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-link-copy-btn`
	return (
		<CommandBtn
			tooltip="复制链接"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			disabled={!editor.isActive('link')}
			onCommand={() => {
				const href = editor.getAttributes('link').href
				if (href) {
					copy(href)
					Toast.success({ content: '复制链接成功' })
				}
			}}
		>
			<TbCopy />
		</CommandBtn>
	)
}
