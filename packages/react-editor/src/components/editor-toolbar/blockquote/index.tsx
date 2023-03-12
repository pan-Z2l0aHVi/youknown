import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import React, { useContext } from 'react'
import { TbQuote } from 'react-icons/tb'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function Blockquote() {
	const { editor } = useContext(ToolbarContext)
	return (
		<Tooltip placement="bottom" title="引用">
			<div
				className={cls('g-blockquote', {
					active: editor.isActive('blockquote'),
					disabled: !editor.can().toggleBlockquote()
				})}
				onClick={() => {
					editor.chain().focus().toggleBlockquote().run()
				}}
			>
				<TbQuote />
			</div>
		</Tooltip>
	)
}
