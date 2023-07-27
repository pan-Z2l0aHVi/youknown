import { useState } from 'react'
import { Button, Divider, Dialog } from '@youknown/react-ui/src'

export default () => {
	const [open, setOpen] = useState(false)
	const show = () => setOpen(true)
	const hide = () => setOpen(false)
	return (
		<div className="p-24px">
			<h1>Dialog</h1>
			<Divider />
			<Button onClick={show}>Show dialog</Button>
			<Dialog open={open} title="Basic Dialog" onCancel={hide}>
				<div className="w-300px">Content</div>
			</Dialog>
			<Divider />
		</div>
	)
}
