import './index.scss'

import { TbTableMinus } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function ColDeleteBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const disabled = !editor.can().deleteColumn()
	if (disabled) {
		return null
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-col-delete-btn`
	return (
		<CommandBtn
			tooltip="删除当前列"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			onCommand={() => {
				editor.chain().focus().deleteColumn().run()
			}}
		>
			<TbTableMinus />
		</CommandBtn>
	)
}
