import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import { TbX } from 'react-icons/tb'

import { useBoolean } from '@youknown/react-hook/src'
import { cls, storage } from '@youknown/utils/src'

export default function Banner() {
	const [visible, { setTrue: show, setFalse: hide }] = useBoolean(false)
	const CLOSED_KEY = 'banner-closed'
	const text = 'Hello!!!'

	useEffect(() => {
		const closed_date = storage.local.get<Dayjs>(CLOSED_KEY)
		if (!closed_date) {
			show()
		} else if (dayjs().diff(closed_date, 'day') > 7) {
			show()
		}
	}, [show])

	if (!visible) {
		return null
	}

	return (
		<div className={cls('relative flex items-center', 'b-16 b-solid bg-primary b-[rgba(255,255,255,0.8)]')}>
			<div className="absolute left-50% top-50% translate-x--50% translate-y--50% max-w-90% truncate color-primary">
				{text}
			</div>
			<div
				className="absolute right-8px flex items-center justify-center w-24px h-24px cursor-pointer color-primary hover-color-primary-hover"
				onClick={() => {
					storage.local.set(CLOSED_KEY, dayjs())
					hide()
				}}
			>
				<TbX className="text-16px" />
			</div>
		</div>
	)
}
