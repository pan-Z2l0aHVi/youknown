import { cls } from '@youknown/utils/src'
import { forwardRef, HTMLAttributes } from 'react'
import { UI_PREFIX } from '../../constants'
import './space.scss'

interface SpaceProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	align?: 'start' | 'end' | 'center' | 'baseline'
	direction?: 'horizontal' | 'vertical'
}

const Space = forwardRef<HTMLDivElement, SpaceProps>((props, propRef) => {
	const { children, className, size = 'medium', align = 'start', direction = 'horizontal', style, ...rest } = props

	function toAlignItems(align: string) {
		if (['start', 'end'].includes(align)) {
			return `flex-${align}`
		}
		return align
	}
	function toFlexDirection(direction: string) {
		if (direction === 'horizontal') return 'row'
		if (direction === 'vertical') return 'column'
		return 'row'
	}

	const prefixCls = `${UI_PREFIX}-space`
	const wrapCls = cls(className, prefixCls, `${prefixCls}-${direction}-${size}`)

	return (
		<div
			ref={propRef}
			className={wrapCls}
			style={{
				display: 'flex',
				alignItems: toAlignItems(align),
				flexDirection: toFlexDirection(direction),
				...style
			}}
			{...rest}
		>
			{children}
		</div>
	)
})
Space.displayName = 'Space'
export default Space
