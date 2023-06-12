import { ComponentProps, forwardRef } from 'react'
import { NavLink } from 'react-router-dom'
import useTransitionNavigate from '@/hooks/use-transition-navigate'

const TransitionNavLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NavLink>>((props, ref) => {
	const { onClick, to, replace, state, relative, preventScrollReset, ...rest } = props
	const navigate = useTransitionNavigate()

	return (
		<NavLink
			ref={ref}
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
export default TransitionNavLink
