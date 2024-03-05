import { useTranslation } from 'react-i18next'

import Header from '@/app/components/header'
import { components } from '@/utils/mdx-components'

import RichTextEditorMDX from './rich-text-editor.mdx'

export default function RichTextEditorDemo() {
	const { t } = useTranslation()

	return (
		<>
			<Header heading={t('page.title.rte')}></Header>

			<div className="rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-800px">
				<RichTextEditorMDX components={components} />
			</div>
		</>
	)
}
