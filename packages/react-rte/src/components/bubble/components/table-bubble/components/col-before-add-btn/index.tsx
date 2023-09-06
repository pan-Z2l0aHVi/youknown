import './index.scss'

import { TbTablePlus } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function ColBeforeAddBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const disabled = !editor.can().addColumnBefore()
	if (disabled) {
		return null
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-col-before-add-btn`
	return (
		<CommandBtn
			tooltip="左侧插入列"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			onCommand={() => {
				editor.chain().focus().addColumnBefore().run()
			}}
		>
			<TbTablePlus />
		</CommandBtn>
	)
}
