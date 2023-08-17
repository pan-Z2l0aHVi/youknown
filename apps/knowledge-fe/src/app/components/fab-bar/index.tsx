import { GrGithub } from 'react-icons/gr'

import { Button, Space, Tooltip } from '@youknown/react-ui/src'

import BackTop from '../back-top'

export default function FabBar() {
	const fab_list = [
		{
			id: 1,
			title: 'Github',
			tooltip_disabled: true,
			icon: <GrGithub className="text-20px" />,
			handler: () => {
				window.open('https://github.com/pb0710/youknown')
			}
		}
	]
	return (
		<Space className="z-9 fixed right-48px bottom-32px" direction="vertical">
			<BackTop />

			{fab_list.map(item => (
				<Tooltip key={item.id} title={item.title} disabled={item.tooltip_disabled}>
					<Button
						circle
						size="large"
						className="shadow-shadow-m bg-bg1! bg-bg1! hover-brightness-95 active-brightness-90"
						onClick={item.handler}
					>
						{item.icon}
					</Button>
				</Tooltip>
			))}
		</Space>
	)
}
