import React, { useState } from 'react'
import { Button, Divider, Dropdown, Space } from '@youknown/react-ui/src'
import { TbCheck, TbCheckbox, TbChevronRight } from 'react-icons/tb'

export default () => {
	const [open, setOpen] = useState(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Dropdown</h1>
			<Divider />
			<Space>
				<Dropdown
					content={
						<Dropdown.Menu>
							<Dropdown.Item>dropdown item 1</Dropdown.Item>
							<Dropdown.Item>dropdown item 2</Dropdown.Item>
							<Dropdown.Item>dropdown item 3</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button>hover</Button>
				</Dropdown>
				<Dropdown
					trigger="click"
					content={
						<Dropdown.Menu>
							<Dropdown.Item>dropdown item 1</Dropdown.Item>
							<Dropdown.Item>dropdown item 2</Dropdown.Item>
							<Dropdown.Item>dropdown item 3</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button>click</Button>
				</Dropdown>
				<Dropdown
					trigger="manual"
					open={open}
					onOpenChange={val => {
						console.log('val: ', val)
						setOpen(val)
					}}
					onClickOutside={() => {
						setOpen(false)
					}}
					content={
						<Dropdown.Menu>
							<Dropdown.Item
								onClick={() => {
									setOpen(false)
								}}
							>
								dropdown item 1
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => {
									setOpen(false)
								}}
							>
								dropdown item 2
							</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button
						onClick={() => {
							setOpen(p => !p)
						}}
					>
						manual
					</Button>
				</Dropdown>
			</Space>
			<Divider />
			<Space>
				<Dropdown
					content={
						<Dropdown.Menu closeAfterItemClick>
							<Dropdown.Item>dropdown item 1</Dropdown.Item>
							<Dropdown.Item>dropdown item 2</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button>Close after click</Button>
				</Dropdown>
				<Dropdown
					content={
						<Dropdown.Menu>
							<Dropdown.Item closeAfterItemClick>It will close</Dropdown.Item>
							<Dropdown.Item>It won't close</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button>Close after item click</Button>
				</Dropdown>
			</Space>
			<Divider />
			<Dropdown
				trigger="click"
				content={
					<Dropdown.Menu>
						<Dropdown.Title>Group 1</Dropdown.Title>
						<Dropdown.Item>dropdown item 1</Dropdown.Item>
						<Dropdown.Item>dropdown item 2</Dropdown.Item>
						<Divider size="small" />
						<Dropdown.Title>Group 2</Dropdown.Title>
						<Dropdown.Item>dropdown item 1</Dropdown.Item>
						<Dropdown.Item>dropdown item 2</Dropdown.Item>
					</Dropdown.Menu>
				}
			>
				<Button>Compose</Button>
			</Dropdown>
			<Divider />
			<Space>
				<Dropdown
					content={
						<Dropdown.Menu>
							<Dropdown.Item prefix={<TbCheckbox />}>dropdown item 1</Dropdown.Item>
							<Dropdown.Item prefix={<TbCheckbox />}>dropdown item 2</Dropdown.Item>
							<Dropdown.Item prefix={<TbCheckbox />}>dropdown item 3</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button>Prefix</Button>
				</Dropdown>
				<Dropdown
					content={
						<Dropdown.Menu>
							<Dropdown.Item suffix={<TbChevronRight />}>dropdown item 1</Dropdown.Item>
							<Dropdown.Item suffix={<TbChevronRight />}>dropdown item 2</Dropdown.Item>
							<Dropdown.Item suffix={<TbChevronRight />}>dropdown item 3</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button>Suffix</Button>
				</Dropdown>
			</Space>
			<Divider />
			<Dropdown
				content={
					<Dropdown.Menu>
						<Dropdown.Item closeAfterItemClick>dropdown item 1</Dropdown.Item>
						<Dropdown
							spacing={-6}
							placement="right-start"
							content={
								<Dropdown.Menu>
									<Dropdown
										spacing={-6}
										placement="right-start"
										content={
											<Dropdown.Menu closeAfterItemClick>
												<Dropdown.Item>dropdown item 1</Dropdown.Item>
												<Dropdown.Item>dropdown item 2</Dropdown.Item>
												<Dropdown.Item>dropdown item 3</Dropdown.Item>
												<Dropdown.Item>dropdown item 4</Dropdown.Item>
												<Dropdown.Item>dropdown item 5</Dropdown.Item>
												<Dropdown.Item>dropdown item 6</Dropdown.Item>
											</Dropdown.Menu>
										}
									>
										<Dropdown.Item suffix={<TbChevronRight />}>dropdown item 3</Dropdown.Item>
									</Dropdown>
									<Dropdown.Item closeAfterItemClick>dropdown item 2</Dropdown.Item>
									<Dropdown.Item closeAfterItemClick>dropdown item 3</Dropdown.Item>
									<Dropdown.Item closeAfterItemClick>dropdown item 4</Dropdown.Item>
								</Dropdown.Menu>
							}
						>
							<Dropdown.Item suffix={<TbChevronRight />}>dropdown item 2</Dropdown.Item>
						</Dropdown>
						<Dropdown.Item closeAfterItemClick>dropdown item 3</Dropdown.Item>
						<Dropdown.Item closeAfterItemClick>dropdown item 3</Dropdown.Item>
						<Dropdown.Item closeAfterItemClick>dropdown item 4</Dropdown.Item>
					</Dropdown.Menu>
				}
			>
				<Button>Nested</Button>
			</Dropdown>
			<Divider />
			<Dropdown
				trigger="click"
				content={
					<Dropdown.Menu>
						<Dropdown.Item prefix={<TbCheck />}>Dropdown item 1</Dropdown.Item>
						<Dropdown.Item prefix={<TbCheck />}>Dropdown item 2</Dropdown.Item>
						<Dropdown.Item prefix={<TbCheck />}>Dropdown item 3</Dropdown.Item>
					</Dropdown.Menu>
				}
			>
				<Button>icon dropdown</Button>
			</Dropdown>
		</div>
	)
}
