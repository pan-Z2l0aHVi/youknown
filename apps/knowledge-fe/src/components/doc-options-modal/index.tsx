import { upload_file } from '@/libs/qiniu'
import { Button, Card, Form, Modal, Radio, Space, Upload, XIcon } from '@youknown/react-ui/src'

interface DocOptionsModalProps {
	open: boolean
	hide_modal: () => void
}

export default function DocOptionsModal(props: DocOptionsModalProps) {
	const { open, hide_modal } = props

	const form = Form.useForm({
		defaultState: {
			cover: [],
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
		}
	})

	const upload_cover = (file: File) => {
		return new Promise<string>((resolve, reject) => {
			upload_file(file, {
				complete(url) {
					console.log('upload cover url: ', url)
					// onChange?.(url)
					resolve(url)
				},
				error(err) {
					reject(err)
				}
			})
		})
	}

	return (
		<Modal className="backdrop-blur-md !bg-[rgba(0,0,0,0.2)]" open={open} onCancel={hide_modal}>
			<Card
				shadow
				header={
					<div className="flex justify-between p-[24px_24px_0]">
						<span className="text-16px">文档设置</span>
						<XIcon onClick={hide_modal} />
					</div>
				}
			>
				<div className="w-480px max-w-[calc(100vw-32px)] p-24px">
					<Form form={form} labelWidth="120px">
						<Form.Field label="cover" labelText="封面：">
							<Upload action={upload_cover} />
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
						<Form.Field labelText=" " className="m-b-0! m-t-16px">
							<Space>
								<Button onClick={hide_modal}>取消</Button>
								<Button type="submit" primary>
									保存
								</Button>
							</Space>
						</Form.Field>
					</Form>
				</div>
			</Card>
		</Modal>
	)
}
