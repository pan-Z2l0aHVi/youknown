import { cls } from '@youknown/utils/src'
import { ReactNode } from 'react'

interface HeaderProps {
	children?: ReactNode
	heading: string
	sticky?: boolean
	bordered?: boolean
}

export default function Header(props: HeaderProps) {
	const { children, heading, sticky = false, bordered = false } = props
	return (
		<header
			className={cls(
				'flex items-center justify-between h-56px pl-32px pr-32px bg-bg-0',
				sticky && 'sticky top-0 z-20',
				bordered && 'b-b-1 b-b-solid b-bd-line'
			)}
		>
			<h3>{heading}</h3>
			{children}
		</header>
	)
}