import { Button, Card, Form, Input, Modal, Space } from '@youknown/react-ui/src'
import React, { useContext, useEffect } from 'react'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function ImgModal() {
	const { editor, imgModalOpen, setImgModalOpen } = useContext(ToolbarContext)

	const handleClose = () => {
		setImgModalOpen(false)
	}

	const form = Form.useForm({
		defaultState: {
			imgSrc: ''
		},
		onFulfilled({ imgSrc }) {
			handleClose()
			editor.chain().updateAttributes('image', { src: imgSrc }).run()
		}
	})

	useEffect(() => {
		if (imgModalOpen) {
			form.setState({
				imgSrc: editor.getAttributes('image').src ?? ''
			})
		}
	}, [editor, form, imgModalOpen])

	return (
		<Modal open={imgModalOpen} onCancel={handleClose} unmountOnExit>
			<Card className="g-img-modal-content">
				<Form form={form} labelWidth="72px">
					<Form.Field label="imgSrc" labelText="图片地址">
						<Input.Textarea className="g-img-modal-src-input" autoFocus autosize placeholder="请输入网址" />
					</Form.Field>
					<div className="g-img-modal-action-bar">
						<Space>
							<Button onClick={handleClose}>取消</Button>
							<Button primary type="submit">
								确认
							</Button>
						</Space>
					</div>
				</Form>
			</Card>
		</Modal>
	)
}
