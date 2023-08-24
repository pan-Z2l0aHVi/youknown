import { delete_doc } from '@/apis/doc'
import { useUIStore } from '@/stores'
import { Dialog } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

interface DocDeleteDialogProps {
	open: boolean
	hide_dialog: () => void
	doc_ids: string[]
	on_deleted: () => void
}

export default function DocDeleteDialog(props: DocDeleteDialogProps) {
	const { open, hide_dialog, doc_ids = [], on_deleted } = props
	const is_dark_theme = useUIStore(state => state.is_dark_theme)

	const handle_delete = async () => {
		try {
			await delete_doc({ doc_ids })
			on_deleted()
			hide_dialog()
		} catch (error) {
			console.error('error: ', error)
		}
	}

	return (
		<Dialog
			maskClassName={cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			)}
			open={open}
			title="删除文档"
			okDanger
			okText="删除"
			cancelText="取消"
			closeIcon={null}
			onCancel={hide_dialog}
			onOk={handle_delete}
		>
			一旦执行该操作将无法恢复，是否确认删除？
		</Dialog>
	)
}
