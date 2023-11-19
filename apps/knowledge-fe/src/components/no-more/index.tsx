import { ForwardedRef, forwardRef } from 'react'

import { cls } from '@youknown/utils/src'

interface MoreLoadingProps {
	ending_text?: string
}
function NoMore(props: MoreLoadingProps, ref: ForwardedRef<HTMLDivElement>) {
	const { ending_text = '没有更多内容了' } = props
	return (
		<div
			ref={ref}
			className={cls(
				'relative flex justify-center items-center h-80px',
				'after:absolute after:content-empty after:w-240px after:b-b-1 after:b-b-solid after:b-bd-line'
			)}
		>
			<div className="z-1 pl-8px pr-8px bg-bg-0 color-text-2">{ending_text}</div>
		</div>
	)
}
export default forwardRef(NoMore)
