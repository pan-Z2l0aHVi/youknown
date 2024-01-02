import { ComponentProps, forwardRef } from 'react'

import useTransitionNavigate from '@/hooks/use-transition-navigate'

const { Link } = await import('react-router-dom')

const TransitionLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>((props, ref) => {
	const { onClick, to, replace, state, relative, preventScrollReset, style, ...rest } = props
	const navigate = useTransitionNavigate()

	return (
		<Link
			ref={ref}
			style={{ textDecoration: 'none', color: 'inherit', ...style }}
			to={to}
			replace={replace}
			state={state}
			relative={relative}
			preventScrollReset={preventScrollReset}
			onClick={e => {
				onClick?.(e)
				e.preventDefault()

				navigate(to, {
					replace,
					state,
					relative,
					preventScrollReset
				})
			}}
			{...rest}
		/>
	)
})
export default TransitionLink
