import { useTranslation } from 'react-i18next'

import Header from '@/app/components/header'
import { Space } from '@youknown/react-ui/src'

import { EntryCard } from './components/entry-card'

export default function Home() {
	const { t } = useTranslation()

	return (
		<>
			<Header heading={t('page.title.home')}></Header>

			<Space size="large" className="<sm:justify-center sm:p-32px <sm:p-16px">
				<EntryCard title="React RTE" desc={t('desc.react_rte')} code="npm i @youknown/react-rte" />
				<EntryCard title="React UI" desc={t('desc.react_ui')} code="npm i @youknown/react-ui" />
				<EntryCard title="React Hook" desc={t('desc.react_hook')} code="npm i @youknown/react-hook" />
			</Space>
		</>
	)
}
