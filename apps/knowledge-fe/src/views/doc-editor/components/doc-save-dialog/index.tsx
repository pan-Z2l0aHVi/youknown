import { useAppDispatch, useAppSelector } from '@/hooks'
import { record } from '@/store/record'
import { Dialog } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import dayjs from 'dayjs'

interface DocSaveDialogProps {
	open: boolean
	hide_dialog: () => void
}

export default function DocSaveDialog(props: DocSaveDialogProps) {
	const { open, hide_dialog } = props
	const dispatch = useAppDispatch()
	const is_dark_theme = useAppSelector(state => state.ui.is_dark_theme)

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
			maskClassName={cls(
				'backdrop-blur-xl',
				is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
			)}
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
