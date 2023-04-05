import { Dialog } from '@youknown/react-ui/src'
import React from 'react'

interface DocSaveDialogProps {
	open: boolean
	hide_dialog: () => void
}

export default function DocSaveDialog(props: DocSaveDialogProps) {
	const { open, hide_dialog } = props

	return (
		<Dialog open={open} title="更新文档" okText="更新" cancelText="取消" closeIcon={null} onCancel={hide_dialog}>
			Content
		</Dialog>
	)
}
