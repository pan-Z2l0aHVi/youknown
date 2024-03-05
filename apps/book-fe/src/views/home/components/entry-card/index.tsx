import copy from 'copy-to-clipboard'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

import TransitionNavLink from '@/components/transition-nav-link'
import { Card, Toast } from '@youknown/react-ui/src'

export interface EntryCardProps {
	title: string
	desc: string
	code: string
}
export function EntryCard(props: EntryCardProps) {
	const { title, desc, code } = props
	const { t } = useTranslation()
	const handle_copy_code = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		copy(code)
		Toast.success(t('code.copy.success'))
	}
	return (
		<TransitionNavLink
			className="decoration-none mb-24px hover-translate-y--12px transition-transform"
			to="/ui_components"
		>
			<Card shadow header={title}>
				<div className="p-24px">
					<div>{desc}</div>
					<pre onClick={handle_copy_code}>
						<code className="p-[4px_6px] bg-bg-3 rd-radius-m box-decoration-clone">{code}</code>
					</pre>
				</div>
			</Card>
		</TransitionNavLink>
	)
}
