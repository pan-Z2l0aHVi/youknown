import { useAppContentEl } from '@/hooks'
import { useBoolean } from '@youknown/react-hook/src'
import { Button, Motion, Tooltip } from '@youknown/react-ui/src'
import { debounce } from '@youknown/utils/src'
import React, { useEffect } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'

interface BackTop {
	threshold?: number
}
export default function BackTop(props: BackTop) {
	const { threshold = 400 } = props
	const [visible, { setTrue: show, setFalse: hide }] = useBoolean(false)
	const target = useAppContentEl()

	const handle_to_top = () => {
		target?.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}
	useEffect(() => {
		if (!target) return
		const scroll_handler = debounce(() => {
			if (target.scrollTop > threshold) {
				show()
			} else {
				hide()
			}
		}, 100)
		target.addEventListener('scroll', scroll_handler)
		return () => {
			target.removeEventListener('scroll', scroll_handler)
		}
	}, [hide, show, target, threshold])

	return (
		<Tooltip title="返回顶部">
			<Motion.Zoom in={visible}>
				<Button
					circle
					size="large"
					className="z-9 fixed right-48px bottom-32px shadow-shadow-m bg-bg1!"
					onClick={handle_to_top}
				>
					<TbArrowBarToUp className="text-22px" />
				</Button>
			</Motion.Zoom>
		</Tooltip>
	)
}
