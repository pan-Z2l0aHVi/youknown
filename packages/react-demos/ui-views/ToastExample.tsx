import React from 'react'
import { Button, Divider, Space, Toast } from '@youknown/react-ui/src'
import { TbInfoCircle } from 'react-icons/tb'

export default () => {
	return (
		<div style={{ padding: 24 }}>
			<h1>Toast</h1>
			<Divider />
			<Button
				onClick={() => {
					Toast.show({ title: 'Title' })
				}}
			>
				Show basic toast
			</Button>
			<Divider />
			<Button
				onClick={() => {
					Toast.show({ title: 'With icon', icon: <TbInfoCircle /> })
				}}
			>
				With icon toast
			</Button>
			<Divider />
			<Button
				onClick={() => {
					Toast.show({ title: 'Closable', closable: true })
				}}
			>
				Closable toast
			</Button>
			<Divider />
			<Space>
				<Button
					onClick={() => {
						Toast.show({ title: 'Top left', position: 'top-left' })
					}}
				>
					Top left
				</Button>
				<Button
					onClick={() => {
						Toast.show({ title: 'Top', position: 'top' })
					}}
				>
					Top
				</Button>
				<Button
					onClick={() => {
						Toast.show({ title: 'Top right', position: 'top-right' })
					}}
				>
					Top right
				</Button>
				<Button
					onClick={() => {
						Toast.show({ title: 'Bottom right', position: 'bottom-left' })
					}}
				>
					Bottom left
				</Button>
				<Button
					onClick={() => {
						Toast.show({ title: 'Bottom', position: 'bottom' })
					}}
				>
					Bottom
				</Button>
				<Button
					onClick={() => {
						Toast.show({ title: 'Bottom right', position: 'bottom-right' })
					}}
				>
					Bottom right
				</Button>
			</Space>
		</div>
	)
}
