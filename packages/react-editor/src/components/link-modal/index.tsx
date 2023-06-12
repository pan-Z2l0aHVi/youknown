import { Button, Card, Form, Input, Modal, Space } from '@youknown/react-ui/src'
import { useContext, useEffect } from 'react'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

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

	const prefixCls = `${UI_EDITOR_PREFIX}-link-modal`
	return (
		<Modal open={linkModalOpen} onCancel={handleClose} unmountOnExit>
			<Card className={`${prefixCls}-content`}>
				<Form form={form} labelWidth="72px">
					<Form.Field label="linkHref" labelText="链接地址">
						<Input.Textarea
							className={`${prefixCls}-href-input`}
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
