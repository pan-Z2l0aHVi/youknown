import { Doc, get_doc_info, update_doc } from '@/apis/doc'
import PicUpload from '@/components/pic-upload'
import { useUIStore } from '@/stores'
import { validateMaxLength, validateRequired } from '@/utils/validators'
import { useBoolean, useFetch } from '@youknown/react-hook/src'
import {
	Button,
	Card,
	CloseIcon,
	Form,
	Input,
	Loading,
	Modal,
	Motion,
	Radio,
	Space,
	Toast
} from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

interface DocOptionsModalProps {
	open: boolean
	doc_id: string
	hide_modal: () => void
	on_updated?: (doc: Doc) => void
}

export default function DocOptionsModal(props: DocOptionsModalProps) {
	const { open, hide_modal, doc_id, on_updated } = props
	const is_dark_theme = useUIStore(state => state.is_dark_theme)

	const [save_loading, { setTrue: show_save_loading, setFalse: hide_save_loading }] = useBoolean(false)
	const save_doc = async () => {
		const state = form.getState()
		show_save_loading()
		try {
			const res = await update_doc({
				doc_id,
				title: state.title,
				cover: state.cover,
				public: !!state.is_publish
			})
			on_updated?.(res)
			hide_modal()
		} catch (error) {
			Toast.error({ content: '保存失败' })
		} finally {
			hide_save_loading()
		}
	}

	const form = Form.useForm({
		defaultState: {
			title: '',
			cover: '',
			is_publish: 0
		},
		onStateChange(org) {
			const state = form.getState()
			console.log('org: ', org, state[org.label])
			switch (org.label) {
				case 'cover':
					break

				case 'is_publish':
					break

				default:
					break
			}
		},
		onFulfilled() {
			save_doc()
		}
	})

	const { loading: initial_loading } = useFetch(get_doc_info, {
		params: [{ doc_id }],
		ready: open,
		onSuccess(data) {
			form.setState({
				title: data.title,
				cover: data.cover,
				is_publish: data.public ? 1 : 0
			})
		}
	})

	return (
		<Modal
			className={cls('backdrop-blur-xl', is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]')}
			open={open}
			onCancel={hide_modal}
			unmountOnExit
		>
			<Motion.Zoom in={open}>
				<Card
					shadow
					header={
						<div className="flex justify-between p-[24px_24px_0]">
							<span className="text-16px">文档设置</span>
							<CloseIcon onClick={hide_modal} />
						</div>
					}
				>
					<Loading spinning={initial_loading}>
						<div className="w-480px max-w-[calc(100vw-32px)] p-24px">
							<Form form={form} labelWidth="148px">
								<Form.Field label="cover" labelText="封面：">
									<PicUpload />
								</Form.Field>
								<Form.Field
									label="title"
									labelText="标题："
									validators={[validateRequired(), validateMaxLength(30)]}
								>
									<Input />
								</Form.Field>
								<Form.Field label="is_publish" labelText="动态设置：">
									<Radio.Group
										options={[
											{
												label: 0,
												child: '不公开'
											},
											{
												label: 1,
												child: '公开发布'
											}
										]}
									/>
								</Form.Field>
								<Form.Field labelText=" " className="mb-0! mt-16px">
									<Space>
										<Button onClick={hide_modal}>取消</Button>
										<Button loading={save_loading} type="submit" primary>
											保存
										</Button>
									</Space>
								</Form.Field>
							</Form>
						</div>
					</Loading>
				</Card>
			</Motion.Zoom>
		</Modal>
	)
}
