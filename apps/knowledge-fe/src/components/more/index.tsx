import { ButtonHTMLAttributes, forwardRef } from 'react'
import { TbDots } from 'react-icons/tb'

import { cls } from '@youknown/utils/src'

interface MoreProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean
}
const More = forwardRef<HTMLButtonElement, MoreProps>((props, ref) => {
	const { active = false, ...rest } = props
	return (
		<button
			ref={ref}
			type="button"
			className={cls(
				'm-0 p-0 cursor-pointer',
				'relative b-12 b-solid rd-full bg-primary b-[rgba(255,255,255,0.8)]',
				'hover-brightness-95 active-brightness-90!',
				active && 'opacity-50'
			)}
			{...rest}
		>
			<TbDots className="absolute translate-x--50% translate-y--50% color-primary text-18px" />
		</button>
	)
})

export default More
