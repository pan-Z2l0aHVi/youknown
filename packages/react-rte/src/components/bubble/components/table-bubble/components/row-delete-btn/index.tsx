import './index.scss'

import { TbTableMinus } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

import { ButtonProps, UI_EDITOR_PREFIX } from '../../../../../../common'
import CommandBtn from '../../../../../command-btn'

export default function RowDeleteBtn(props: ButtonProps) {
	const { editor, tooltip = true } = props
	const disabled = !editor.can().deleteRow()
	if (disabled) {
		return null
	}
	const prefixCls = `${UI_EDITOR_PREFIX}-row-delete-btn`
	return (
		<CommandBtn
			tooltip="删除当前行"
			tooltipDisabled={!tooltip}
			className={cls(prefixCls)}
			onCommand={() => {
				editor.chain().focus().deleteRow().run()
			}}
		>
			<TbTableMinus />
		</CommandBtn>
	)
}
