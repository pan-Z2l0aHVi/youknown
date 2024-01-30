import { useTranslation } from 'react-i18next'
import { GrGithub } from 'react-icons/gr'
import { TbMessagePlus } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'

import { Button, Space, Tooltip } from '@youknown/react-ui/src'

import BackTop from '../back-top'

export default function FabBar() {
	const { pathname } = useLocation()
	const { t } = useTranslation()
	const fab_list = [
		{
			id: 1,
			title: 'Github',
			tooltip_disabled: true,
			icon: <GrGithub className="text-20px" />,
			handler: () => {
				window.open('https://github.com/pan-Z2l0aHVi/knowledge-fe/tree/master/apps/knowledge-fe')
			}
		}
	]
	if (pathname === '/browse/feed-detail') {
		fab_list.unshift({
			id: 2,
			title: t('comment.text'),
			tooltip_disabled: true,
			icon: <TbMessagePlus className="text-20px" />,
			handler: () => {
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'instant'
				})
			}
		})
	}
	return (
		<Space className="z-9 fixed sm:bottom-32px sm:right-48px <sm:right-8px <sm:bottom-80px" direction="vertical">
			<BackTop />

			{fab_list.map(item => (
				<Tooltip key={item.id} title={item.title} disabled={item.tooltip_disabled}>
					<Button circle size="large" className="shadow-shadow-m" onClick={item.handler}>
						{item.icon}
					</Button>
				</Tooltip>
			))}
		</Space>
	)
}
