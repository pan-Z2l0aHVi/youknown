import { useState } from 'react'

import { Button, Card, Divider, Modal } from '@youknown/react-ui/src'

export default () => {
	const [open, setOpen] = useState(false)
	const show = () => setOpen(true)
	const hide = () => setOpen(false)
	return (
		<div>
			<h1>Modal</h1>
			<Divider />
			<Button onClick={show}>Show modal</Button>
			<Modal open={open} onCancel={hide}>
				<Card className="w-320px! h-200px!">Content</Card>
			</Modal>
			<Divider />
		</div>
	)
}
