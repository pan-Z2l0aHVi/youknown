import { HTMLAttributes, ReactNode } from 'react'

import { cls } from '@youknown/utils/src'

interface LoginCardProps extends HTMLAttributes<HTMLElement> {
	active: boolean
	icon: ReactNode
	title: string
}
export default function LoginCard(props: LoginCardProps) {
	const { active, icon, title, ...rest } = props
	return (
		<div
			className={cls(
				'flex flex-col items-center justify-center h-160px rd-radius-m bg-bg-0 b-1 b-solid b-bd-line',
				'cursor-pointer select-none',
				'hover-bg-hover active-bg-active',
				{
					'b-primary shadow-[inset_0_0_0_1px_var(--ui-color-primary)]': active
				}
			)}
			{...rest}
		>
			{icon}
			<div className="color-text-2 mt-8px">{title}</div>
		</div>
	)
}
