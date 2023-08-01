import { useAppDispatch, useAppSelector } from '@/hooks'
import { record } from '@/store/record'
import { Dialog } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import dayjs from 'dayjs'

interface DocDeleteDialogProps {
	open: boolean
	hide_dialog: () => void
}

export default function DocDeleteDialog(props: DocDeleteDialogProps) {
	const { open, hide_dialog } = props
	const dispatch = useAppDispatch()
	const is_dark_theme = useAppSelector(state => state.ui.is_dark_theme)

	const handle_delete = () => {
		dispatch(
			record({
				action: '删除',
				target: '',
				target_id: '',
				obj_type: '文章',
				obj: '《如何看待近期大火的Chat GPT》',
				obj_id: '1232',
				timing: dayjs().valueOf()
			})
		)
		hide_dialog()
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
