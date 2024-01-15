import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import { TbX } from 'react-icons/tb'

import { useBoolean } from '@youknown/react-hook/src'
import { cls, storage } from '@youknown/utils/src'

export default function Banner() {
	const [visible, { setTrue: show, setFalse: hide }] = useBoolean(false)
	const CLOSED_KEY = 'banner-closed'
	const text = 'Welcome~'

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
		<div
			className={cls(
				'relative flex justify-center items-center flex-wrap break-all p-[4px_40px] min-h-40px color-primary',
				'before:content-empty before:absolute before:left-0 before-top-0 before:w-100% before:h-100% before:opacity-30 before:bg-primary'
			)}
		>
			{text}
			<div
				className="absolute right-8px flex items-center justify-center w-24px h-24px cursor-pointer [@media(hover:hover)]-hover-color-primary-hover"
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
