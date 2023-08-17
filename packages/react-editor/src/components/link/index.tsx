import './index.scss'

import { useContext } from 'react'
import { RiLinkM } from 'react-icons/ri'

import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

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
				<RiLinkM />
			</div>
		</Tooltip>
	)
}
