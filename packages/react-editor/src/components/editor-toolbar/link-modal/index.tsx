import { Button, Card, Form, Input, Modal, Space } from '@youknown/react-ui/src'
import React, { useContext, useEffect } from 'react'
import ToolbarContext from '../toolbar-context'
import './index.scss'

export default function LinkModal() {
	const { editor, linkModalOpen, setLinkModalOpen } = useContext(ToolbarContext)

	const handleClose = () => {
		setLinkModalOpen(false)
	}

	const form = Form.useForm({
		defaultState: {
			linkHref: ''
		},
		onFulfilled({ linkHref }) {
			editor.chain().focus().extendMarkRange('link').setLink({ href: linkHref }).run()
			handleClose()
		}
	})

	useEffect(() => {
		if (linkModalOpen) {
			form.setState({
				linkHref: editor.getAttributes('link').href ?? ''
			})
		}
	}, [editor, form, linkModalOpen])

	return (
		<Modal open={linkModalOpen} onCancel={handleClose} unmountOnExit>
			<Card className="g-link-modal-content">
				<Form form={form} labelWidth="72px">
					<Form.Field label="linkHref" labelText="链接地址">
						<Input.Textarea
							className="g-link-modal-href-input"
							autoFocus
							autosize
							placeholder="请输入网址"
						/>
					</Form.Field>
					<div className="g-link-modal-action-bar">
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
