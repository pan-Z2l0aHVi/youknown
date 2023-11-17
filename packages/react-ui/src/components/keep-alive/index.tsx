import { ReactNode, Suspense, useEffect, useRef } from 'react'

interface RepeaterProps {
	children: ReactNode
	show: boolean
}
const Repeater = (props: RepeaterProps) => {
	const { children, show } = props
	const resolveRef = useRef<() => void>()
	useEffect(
		() => () => {
			resolveRef.current?.()
		},
		[]
	)
	if (!show) {
		throw new Promise<void>(resolve => {
			resolveRef.current = resolve
		})
	}
	return <>{children}</>
}

interface KeepAliveProps extends RepeaterProps {
	fallback?: ReactNode
}
const KeepAlive = (props: KeepAliveProps) => {
	const { children, show, fallback } = props
	return (
		<Suspense fallback={fallback}>
			<Repeater show={show}>{children}</Repeater>
		</Suspense>
	)
}

export default KeepAlive
