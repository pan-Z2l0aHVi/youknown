import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import { TbX } from 'react-icons/tb'

import { useBoolean } from '@youknown/react-hook/src'
import { storage } from '@youknown/utils/src'

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
		<div className="flex items-center p-8px text-center bg-primary color-#fff select-none">
			<div className="flex-1">{text}</div>
			<div
				className="flex items-center justify-center w-24px h-24px cursor-pointer color-#fff hover-color-#ddd"
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
