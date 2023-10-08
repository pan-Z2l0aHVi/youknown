import './anchor.scss'

import {
	ForwardedRef,
	forwardRef,
	Fragment,
	HTMLAttributes,
	MouseEventHandler,
	ReactNode,
	useEffect,
	useMemo,
	useState
} from 'react'

import { useEvent, useThrottle, useUpdateEffect } from '@youknown/react-hook/src'
import { cls, is } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { flattenArray } from '../../utils/flattenArray'

interface AnchorItem {
	labelledby: string
	content: ReactNode
	handler?: MouseEventHandler<HTMLLIElement>
	children?: AnchorItem[]
}

interface AnchorProps extends HTMLAttributes<HTMLUListElement> {
	items?: AnchorItem[]
	container?: Element
}

const Anchor = (props: AnchorProps, ref: ForwardedRef<HTMLUListElement>) => {
	const { className, items = [], container = window, ...rest } = props
	const [selection, setSelection] = useState('')
	const flattenItems = useMemo(() => flattenArray(items), [items])

	const getInViewEle = useEvent(() => {
		let result
		const scrollContainer = is.window(container) ? document.documentElement || document.body : container
		const containerRect = scrollContainer.getBoundingClientRect()
		const documentHeight = window.innerHeight

		function checkInView(ele: Element): boolean {
			const { top, height } = ele.getBoundingClientRect()
			const offsetTop = top - containerRect.top
			if (is.window(container)) {
				const innerTargetOffset = documentHeight / 2
				console.log('innerTargetOffset: ', innerTargetOffset)
				return (top >= 0 && top <= innerTargetOffset) || (top <= 0 && top + height >= innerTargetOffset)
			}
			const innerTargetOffset = containerRect.height / 2
			return (
				(offsetTop >= 0 && offsetTop <= innerTargetOffset) ||
				(offsetTop <= 0 && offsetTop + height >= innerTargetOffset)
			)
		}

		flattenItems.forEach(item => {
			const ele = document.querySelector(`[aria-labelledby="${item.labelledby}"]`)
			if (ele) {
				const inView = checkInView(ele)
				if (inView) {
					result = ele
				}
			}
		})
		return result as unknown as Element
	})

	const onScroll = useThrottle(() => {
		const ele = getInViewEle()
		// console.log('ele: ', ele, scrollingRef.current)
		const labelledby = ele && ele.getAttribute('aria-labelledby')
		if (labelledby) {
			setSelection(labelledby)
		}
	}, 50)

	useEffect(() => {
		container.addEventListener('scroll', onScroll)
		return () => {
			container.removeEventListener('scroll', onScroll)
		}
	}, [container, onScroll])

	// 渲染时触发一次计算
	useEffect(() => {
		onScroll()
	}, [onScroll])
	useUpdateEffect(() => {
		onScroll()
	}, [container])

	const prefixCls = `${UI_PREFIX}-anchor`
	const PL = 16

	const renderItems = (anchorItems: AnchorItem[], depth = 1): ReactNode => {
		return (
			<>
				{anchorItems.map(item => {
					const isSelected = selection === item.labelledby
					return (
						<Fragment key={item.labelledby}>
							<li
								className={cls(`${prefixCls}-item`, {
									selected: isSelected
								})}
								style={{
									paddingLeft: PL * depth
								}}
								aria-current={isSelected}
								onClick={event => {
									item.handler?.(event)
									const ele = document.querySelector(`[aria-labelledby="${item.labelledby}"]`)
									ele?.scrollIntoView({ behavior: 'smooth' })
								}}
							>
								{item.content}
							</li>
							{item.children?.length ? renderItems(item.children, depth + 1) : null}
						</Fragment>
					)
				})}
			</>
		)
	}

	return (
		<ul ref={ref} className={cls(className, prefixCls)} {...rest}>
			{renderItems(items)}
		</ul>
	)
}

Anchor.displayName = 'Anchor'

const RefAnchor = forwardRef(Anchor)
export default RefAnchor
