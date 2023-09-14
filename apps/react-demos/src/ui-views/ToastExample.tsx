import { TbInfoCircle } from 'react-icons/tb'

import { Button, Divider, Space, Toast } from '@youknown/react-ui/src'

export default () => {
	return (
		<div>
			<h1>Toast</h1>
			<Divider />
			<Space>
				<Button
					onClick={() => {
						Toast({ content: 'Hi' })
					}}
				>
					Show basic toast
				</Button>
				<Button
					onClick={() => {
						Toast({
							content: (
								<span>
									<strong>Penguins</strong> are <span className="color-red">birds</span>.
								</span>
							)
						})
					}}
				>
					Toast content element
				</Button>
			</Space>
			<Divider />
			<Space>
				<Button
					onClick={() => {
						Toast.info({
							content: 'Info'
						})
					}}
				>
					Info
				</Button>
				<Button
					onClick={() => {
						Toast.success({
							content: 'Success'
						})
					}}
				>
					Success
				</Button>
				<Button
					onClick={() => {
						Toast.warning({
							content: 'Warning'
						})
					}}
				>
					Warning
				</Button>
				<Button
					onClick={() => {
						Toast.error({
							content: 'Error'
						})
					}}
				>
					Error
				</Button>
			</Space>
			<Divider />
			<Button
				onClick={() => {
					Toast({ content: 'With icon', icon: <TbInfoCircle /> })
				}}
			>
				With icon toast
			</Button>
			<Divider />
			<Space>
				<Button
					onClick={() => {
						const inst = Toast({
							content: 'Click me',
							duration: 10000,
							onClick() {
								console.log('clicked')
								inst.close()
							},
							onClose() {
								console.log('closed')
							}
						})
					}}
				>
					Close toast
				</Button>
				<Button
					onClick={() => {
						const inst = Toast({
							content: 'Click me',
							duration: 5000,
							onClick() {
								console.log('clicked')
								inst.update({
									content: 'Hello'
								})
							},
							onClose() {
								console.log('closed')
							}
						})
					}}
				>
					Update toast
				</Button>
			</Space>
		</div>
	)
}
