import { useState } from 'react'

import { Doc, get_doc_info, update_doc } from '@/apis/doc'
import PicUpload from '@/components/pic-upload'
import { DOC_TITLE_MAX_LEN } from '@/consts'
import { useUIStore } from '@/stores'
import { with_api } from '@/utils/request'
import { validateMaxLength, validateRequired } from '@/utils/validators'
import { useBoolean, useFetch, useUpdate } from '@youknown/react-hook/src'
import { Button, Card, CloseIcon, Form, Input, Loading, Motion, Overlay, Radio, Space } from '@youknown/react-ui/src'
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
	const [cover_uploading, set_cover_uploading] = useState(false)
	const [save_loading, { setTrue: show_save_loading, setFalse: hide_save_loading }] = useBoolean(false)

	const save_doc = async () => {
		const state = form.getState()
		show_save_loading()
		const [err, res] = await with_api(update_doc)({
			doc_id,
			title: state.title,
			cover: state.cover,
			public: !!state.is_publish
		})
		hide_save_loading()
		if (err) {
			return
		}
		on_updated?.(res)
		hide_modal()
	}

	const update = useUpdate()
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
					update()
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
		<Overlay
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
						<Form className="w-480px max-w-[calc(100vw-32px)] p-24px" form={form} labelWidth={120}>
							<Form.Field
								label="cover"
								labelText="封面："
								validators={[
									async cover => {
										if (form.getState().is_publish && !cover) {
											return Promise.reject('公开发布时，封面必填')
										}
									}
								]}
							>
								<PicUpload uploading={cover_uploading} set_uploading={set_cover_uploading} />
							</Form.Field>
							<Form.Field
								label="title"
								labelText="标题："
								validators={[validateRequired(), validateMaxLength(DOC_TITLE_MAX_LEN)]}
							>
								<Input className="w-280px!" />
							</Form.Field>
							<Form.Field label="is_publish" labelText="动态设置：">
								<Radio.Group
									options={[
										{
											label: 0,
											child: '不发布'
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
									<Button className="min-w-80px" onClick={hide_modal}>
										取消
									</Button>
									<Button
										className="min-w-80px"
										disabled={cover_uploading}
										loading={save_loading}
										type="submit"
										primary
									>
										保存
									</Button>
								</Space>
							</Form.Field>
						</Form>
					</Loading>
				</Card>
			</Motion.Zoom>
		</Overlay>
	)
}
