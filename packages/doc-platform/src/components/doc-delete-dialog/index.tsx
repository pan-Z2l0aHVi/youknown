import { Dialog } from '@youknown/react-ui/src'
import React from 'react'

interface DocDeleteDialogProps {
	open: boolean
	hide_dialog: () => void
}

export default function DocDeleteDialog(props: DocDeleteDialogProps) {
	const { open, hide_dialog } = props

	return (
		<Dialog
			open={open}
			title="删除文档"
			okDanger
			okText="删除"
			cancelText="取消"
			closeIcon={null}
			onCancel={hide_dialog}
		>
			一旦执行该操作将无法恢复，是否确认删除？
		</Dialog>
	)
}
