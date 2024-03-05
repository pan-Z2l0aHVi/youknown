import { useTranslation } from 'react-i18next'

import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import FormMDX from './form.mdx'

export default function FormDemo() {
	const { t } = useTranslation()

	return (
		<>
			<Header heading={t('page.title.form')}></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<FormMDX components={components} />
			</div>
		</>
	)
}
