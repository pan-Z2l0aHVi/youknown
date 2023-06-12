import { Button, Card, Form, Input, Modal, Space } from '@youknown/react-ui/src'
import { useContext, useEffect } from 'react'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

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

	const prefixCls = `${UI_EDITOR_PREFIX}-img-modal`

	return (
		<Modal open={imgModalOpen} onCancel={handleClose} unmountOnExit>
			<Card className={`${prefixCls}-content`}>
				<Form form={form} labelWidth="72px">
					<Form.Field label="imgSrc" labelText="图片地址">
						<Input.Textarea
							className={`${prefixCls}-src-input`}
							autoFocus
							autosize
							placeholder="请输入网址"
						/>
					</Form.Field>
					<div className={`${prefixCls}-action-bar`}>
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
