import './progress.scss'

import { CSSProperties, ForwardedRef, forwardRef, HTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { RenderCounterProps } from 'react-countup/build/types'

import { cls, is } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import ProgressCircle from './ProgressCircle'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	defaultPercent?: number
	percent?: number
	direction?: 'horizontal' | 'vertical'
	trackColor?: string
	suffix?: ReactNode
	format?: ((ref: RenderCounterProps) => ReactNode) | null
}

const Progress = (props: ProgressProps, propRef: ForwardedRef<HTMLDivElement>) => {
	const {
		className,
		size = 'medium',
		defaultPercent = 0,
		percent = 0,
		direction = 'horizontal',
		trackColor,
		suffix = '%',
		format,
		...rest
	} = props

	const prePercentRef = useRef(defaultPercent)
	useEffect(() => {
		prePercentRef.current = percent
	}, [percent])

	const prefixCls = `${UI_PREFIX}-progress`

	let rectStyle: CSSProperties
	switch (direction) {
		case 'horizontal':
			rectStyle = {
				width: `${percent}%`
			}
			break
		case 'vertical':
			rectStyle = {
				height: `${percent}%`
			}
			break
	}

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`, `${prefixCls}-${direction}`)}
			{...rest}
		>
			<div
				className={cls(`${prefixCls}-track`, {
					[`${prefixCls}-track-spacing`]: !is.null(format)
				})}
				style={{
					backgroundColor: trackColor
				}}
			>
				<div className={`${prefixCls}-inset`} style={rectStyle}></div>
			</div>
			{is.null(format) || (
				<span className={`${prefixCls}-text`}>
					<CountUp
						start={prePercentRef.current}
						end={percent}
						// duration={0.2}
					>
						{format}
					</CountUp>
					{suffix}
				</span>
			)}
		</div>
	)
}
Progress.displayName = 'Progress'

const RefProgress = forwardRef(Progress)
const ExportProgress = RefProgress as typeof RefProgress & {
	Circle: typeof ProgressCircle
}
ExportProgress.Circle = ProgressCircle
export default ExportProgress
