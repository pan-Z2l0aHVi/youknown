import { useTranslation } from 'react-i18next'

import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import ContextMenuMDX from './context-menu.mdx'

export default function ContextMenuDemo() {
	const { t } = useTranslation()

	return (
		<>
			<Header heading={t('page.title.context_menu')}></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<ContextMenuMDX components={components} />
			</div>
		</>
	)
}
