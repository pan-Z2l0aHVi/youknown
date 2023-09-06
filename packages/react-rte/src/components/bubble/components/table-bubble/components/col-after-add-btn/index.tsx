import './index.scss'

import { TbTablePlus } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function ColAfterAddBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const disabled = !editor.can().addColumnAfter()
	if (disabled) {
		return null
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-col-after-add-btn`
	return (
		<CommandBtn
			tooltip="右侧插入行"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			onCommand={() => {
				editor.chain().focus().addColumnAfter().run()
			}}
		>
			<TbTablePlus />
		</CommandBtn>
	)
}
