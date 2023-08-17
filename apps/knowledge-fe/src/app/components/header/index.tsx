import { ReactNode } from 'react'
import { TbArrowLeft } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import { Button } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

interface HeaderProps {
	children?: ReactNode
	heading: string
	sticky?: boolean
	bordered?: boolean
}

export default function Header(props: HeaderProps) {
	const { children, heading, sticky = false, bordered = false } = props
	const navigate = useNavigate()
	return (
		<header
			className={cls(
				'flex items-center justify-between h-56px pl-32px pr-32px bg-bg-0',
				sticky && 'sticky top-0 z-20',
				bordered && 'b-b-1 b-b-solid b-bd-line'
			)}
		>
			<div className="flex items-center">
				<Button
					className="mr-12px"
					square
					text
					onClick={() => {
						navigate(-1)
					}}
				>
					<TbArrowLeft className="text-18px color-primary" />
				</Button>
				<h3>{heading}</h3>
			</div>
			{children}
		</header>
	)
}
