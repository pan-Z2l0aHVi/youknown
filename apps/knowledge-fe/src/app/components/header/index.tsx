import { ReactNode, useEffect, useState } from 'react'
import { TbArrowLeft } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import { useDebounce } from '@youknown/react-hook/src'
import { Button } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

interface HeaderProps {
	children?: ReactNode
	heading: ReactNode
	bordered?: 'auto' | 'visible' | 'hidden'
}

export default function Header(props: HeaderProps) {
	const { children, heading, bordered = 'auto' } = props

	const navigate = useNavigate()
	const [border_visible, set_border_visible] = useState(false)

	useEffect(() => {
		if (bordered === 'visible') {
			set_border_visible(true)
		} else if (bordered === 'hidden') {
			set_border_visible(false)
		}
	}, [bordered])

	const scroll_handler = useDebounce(
		() => {
			set_border_visible(document.documentElement.scrollTop > 0)
		},
		100,
		{ leading: true }
	)
	useEffect(() => {
		if (bordered === 'auto') {
			window.addEventListener('scroll', scroll_handler)
			return () => {
				window.removeEventListener('scroll', scroll_handler)
			}
		}
	}, [bordered, scroll_handler])

	return (
		<header
			className={cls(
				'flex items-center justify-between h-56px pl-32px pr-32px bg-bg-0',
				'sticky top-0 z-20',
				'b-b-1 b-b-solid',
				border_visible ? 'b-bd-line' : 'b-transparent'
			)}
		>
			<div className="flex items-center">
				<Button
					className="mr-16px"
					square
					text
					onClick={() => {
						navigate(-1)
					}}
				>
					<TbArrowLeft className="text-18px color-primary" />
				</Button>
				<h3 className="whitespace-nowrap">{heading}</h3>
			</div>
			{children}
		</header>
	)
}
