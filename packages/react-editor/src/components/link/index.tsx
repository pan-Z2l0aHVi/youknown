import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useContext } from 'react'
import { TbLink } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

export default function Link() {
	const { editor, setLinkModalOpen } = useContext(ToolbarContext)
	const prefixCls = `${UI_EDITOR_PREFIX}-link-btn`
	return (
		<Tooltip placement="bottom" title="链接">
			<div
				className={cls(prefixCls, {
					active: editor.isActive('link'),
					disabled: !editor.can().setLink({ href: '' })
				})}
				onClick={() => {
					setLinkModalOpen(true)
				}}
			>
				<TbLink />
			</div>
		</Tooltip>
	)
}
