import { Divider, Card, Loading } from '@youknown/react-ui/src'

export default () => {
	return (
		<div className="p-24px">
			<h1>Card</h1>
			<Divider />
			<Card header="Basic card" footer="Footer">
				Content
			</Card>
			<Divider />
			<Card header="Header" cover={<img src="https://iph.href.lu/200x160" />}>
				Content
			</Card>
			<Divider />
			<Card
				header={
					<div className="color-purple p-24px">
						<strong>Custom header</strong>
					</div>
				}
				footer={
					<div className="bg-#eee p-24px rd-b-6px">
						<span>Custom footer</span>
					</div>
				}
			>
				Content
			</Card>
			<Divider />
			<Card bordered={false} header="No border" footer="Footer">
				Content
			</Card>
			<Divider />
			<Card shadow header="Shadow card">
				Content
			</Card>
			<Divider />
			<Loading spinning>
				<Card header="Loading card">Content</Card>
			</Loading>
		</div>
	)
}
