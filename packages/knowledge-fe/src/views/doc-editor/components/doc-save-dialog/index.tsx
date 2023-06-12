import { useAppDispatch } from '@/hooks'
import { record } from '@/store/record'
import { Dialog } from '@youknown/react-ui/src'
import dayjs from 'dayjs'

interface DocSaveDialogProps {
	open: boolean
	hide_dialog: () => void
}

export default function DocSaveDialog(props: DocSaveDialogProps) {
	const { open, hide_dialog } = props
	const dispatch = useAppDispatch()

	const handle_save = () => {
		dispatch(
			record({
				action: '发布',
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
			maskClassName="backdrop-blur-md !bg-[rgba(0,0,0,0.2)]"
			open={open}
			title="更新文档"
			okText="更新"
			cancelText="取消"
			closeIcon={null}
			onCancel={hide_dialog}
			onOk={handle_save}
		>
			Content
		</Dialog>
	)
}
