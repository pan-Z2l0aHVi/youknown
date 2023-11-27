import { ForwardedRef, forwardRef } from 'react'

import { Loading } from '@youknown/react-ui/src'

interface MoreLoadingProps {
	loading_text?: string
}
function MoreLoading(props: MoreLoadingProps, ref: ForwardedRef<HTMLDivElement>) {
	const { loading_text = '加载中...' } = props
	return (
		<div ref={ref} className="flex justify-center items-center h-80px">
			<Loading spinning className="mr-8px" />
			<span className="color-text-3">{loading_text}</span>
		</div>
	)
}
export default forwardRef(MoreLoading)
