import './index.scss'

import { TbTablePlus } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function RowBeforeAddBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const disabled = !editor.can().addRowBefore()
	if (disabled) {
		return null
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-row-before-add-btn`
	return (
		<CommandBtn
			tooltip="上方插入行"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			onCommand={() => {
				editor.chain().focus().addRowBefore().run()
			}}
		>
			<TbTablePlus />
		</CommandBtn>
	)
}
