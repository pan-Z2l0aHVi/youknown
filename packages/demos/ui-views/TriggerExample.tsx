import { Trigger, Divider, Space, Button } from '@youknown/react-ui/src'
import React, { useState } from 'react'

export default () => {
	const [open, setOpen] = useState(false)

	const createContent = (text: string) => (
		<div
			style={{
				width: 'max-content',
				border: '1px solid $bd-line',
				boxShadow: '1px 4px 8px rgba(0,0,0,.1)',
				background: '#fff',
				padding: 8
			}}
		>
			{text}
		</div>
	)

	return (
		<div style={{ padding: 24 }}>
			<h1>Trigger</h1>
			<Space>
				<Trigger trigger="hover" popup={createContent('tooltip')}>
					<Button>hover</Button>
				</Trigger>
				<Trigger trigger="click" popup={createContent('tooltip')}>
					<Button>click</Button>
				</Trigger>
				<Trigger trigger="manual" popup={createContent('tooltip')} open={open} onOpenChange={setOpen}>
					<Button onClick={() => setOpen(p => !p)}>manual</Button>
				</Trigger>
			</Space>
			<Divider />
			<Space>
				<Trigger motion="none" popup={createContent('tooltip')}>
					<Button>no motion</Button>
				</Trigger>
				<Trigger motion="grow" popup={createContent('tooltip')}>
					<Button>grow</Button>
				</Trigger>
				<Trigger motion="stretch" popup={createContent('tooltip')}>
					<Button>stretch</Button>
				</Trigger>
				<Trigger motion="fade" popup={createContent('tooltip')}>
					<Button>fade</Button>
				</Trigger>
				<Trigger motion="zoom" popup={createContent('tooltip')}>
					<Button>zoom</Button>
				</Trigger>
			</Space>
		</div>
	)
}
