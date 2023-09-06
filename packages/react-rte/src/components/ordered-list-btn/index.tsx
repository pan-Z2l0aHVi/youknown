import './index.scss'

import { PiListNumbersBold } from 'react-icons/pi'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'

export default function OrderedListBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const prefixCls = `${UI_EDITOR_PREFIX}-ordered-list-btn`
	return (
		<CommandBtn
			className={cls(prefixCls)}
			tooltip="有序列表"
			tooltipDisabled={!tooltip}
			active={editor.isActive('orderlist')}
			disabled={!editor.can().toggleOrderedList()}
			onCommand={() => {
				editor.chain().focus().toggleOrderedList().run()
			}}
		>
			<PiListNumbersBold />
		</CommandBtn>
	)
}
