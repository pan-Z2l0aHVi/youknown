import { useTranslation } from 'react-i18next'

import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import DatePickerMDX from './date-picker.mdx'

export default function DatePickerDemo() {
	const { t } = useTranslation()

	return (
		<>
			<Header heading={t('page.title.date_picker')}></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<DatePickerMDX components={components} />
			</div>
		</>
	)
}
