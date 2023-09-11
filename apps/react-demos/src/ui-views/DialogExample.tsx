import { useState } from 'react'

import { Button, Dialog, Divider } from '@youknown/react-ui/src'

export default () => {
	const [open, setOpen] = useState(false)
	return (
		<div className="p-24px">
			<h1>Dialog</h1>
			<Divider />
			<Button
				onClick={() => {
					setOpen(true)
				}}
			>
				Show dialog
			</Button>
			<Dialog
				open={open}
				title="Basic Dialog"
				onCancel={() => {
					setOpen(false)
				}}
			>
				<div className="w-300px">Content</div>
			</Dialog>
			<Divider />
			<Button
				onClick={() => {
					Dialog.confirm({
						title: 'Dialog title',
						content: <div className="w-320px">dialog content</div>,
						onOk() {
							console.log('onOk')
						},
						onCancel() {
							console.log('onCancel')
						},
						afterClose() {
							console.log('afterClose')
						}
					})
				}}
			>
				Show dialog by command
			</Button>
		</div>
	)
}
