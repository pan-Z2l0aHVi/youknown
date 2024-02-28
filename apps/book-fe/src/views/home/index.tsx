import { useTranslation } from 'react-i18next'
import { TbSearch } from 'react-icons/tb'

import Header from '@/app/components/header'
import { useUIStore } from '@/stores'
import { useBoolean } from '@youknown/react-hook/src'
import { Button, Input } from '@youknown/react-ui/src'

import Searcher from './components/searcher'

export default function Home() {
	const { t } = useTranslation()
	const is_mobile = useUIStore(state => state.is_mobile)
	const [search_modal_open, { setTrue: show_search_modal, setFalse: hide_search_modal }] = useBoolean(false)

	return (
		<>
			<Header heading={<div className="sm:w-152px">{t('page.title.home')}</div>}>
				{is_mobile ? (
					<Button square text onClick={show_search_modal}>
						<TbSearch className="color-primary text-18px" />
					</Button>
				) : (
					<Input
						prefix={<TbSearch className="color-text-3" />}
						placeholder={t('placeholder.search')}
						outline={false}
						onClick={show_search_modal}
						onEnter={show_search_modal}
					/>
				)}
			</Header>

			<Searcher open={search_modal_open} on_close={hide_search_modal} />

			<div className="flex justify-center sm:p-32px <sm:p-16px">123</div>
		</>
	)
}
