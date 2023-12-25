import './progress-circle.scss'

import { ComponentProps, ForwardedRef, forwardRef, ReactNode, useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { RenderCounterProps } from 'react-countup/build/types'

import { cls, is, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Circle from './Circle'

interface ProgressCircleProps extends ComponentProps<typeof Circle> {
	size?: 'small' | 'medium' | 'large'
	defaultMolecule?: number
	molecule?: number
	denominator?: number
	suffix?: ReactNode
	format?: ((props: RenderCounterProps) => ReactNode) | null
}

const ProgressCircle = (props: ProgressCircleProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const {
		className,
		size = 'medium',
		suffix = '%',
		format,
		defaultMolecule = 0,
		molecule = 0,
		denominator = 100,
		...rest
	} = omit(props, 'duration')

	const preMoleculeRef = useRef(defaultMolecule)
	useEffect(() => {
		preMoleculeRef.current = molecule
	}, [molecule])

	const detailOpen = size === 'small' || is.null(format)
	const prefixCls = `${UI_PREFIX}-progress-circle`

	return (
		<Circle
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`)}
			defaultMolecule={defaultMolecule}
			molecule={molecule}
			denominator={denominator}
			size={size}
			{...rest}
		>
			{detailOpen || (
				<div className={`${prefixCls}-detail`}>
					<CountUp
						className={`${prefixCls}-detail-num`}
						start={preMoleculeRef.current}
						end={molecule}
						// duration={0.4}
					>
						{format}
					</CountUp>
					{suffix && <span className={`${prefixCls}-detail-suffix`}>{suffix}</span>}
				</div>
			)}
		</Circle>
	)
}
ProgressCircle.displayName = 'ProgressCircle'
export default forwardRef(ProgressCircle)
