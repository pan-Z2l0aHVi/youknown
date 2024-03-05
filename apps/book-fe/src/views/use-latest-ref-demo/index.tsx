import { useTranslation } from 'react-i18next'

import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import UseLatestRefMDX from './use-latest-ref.mdx'

export default function UseLatestRefDemo() {
	const { t } = useTranslation()

	return (
		<>
			<Header heading={t('page.title.use_latest_ref')}></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<UseLatestRefMDX components={components} />
			</div>
		</>
	)
}
