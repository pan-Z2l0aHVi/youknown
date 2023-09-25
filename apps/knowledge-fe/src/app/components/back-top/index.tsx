import { useEffect, useState } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'

import { useAppContentEl } from '@/hooks'
import { useDebounce } from '@youknown/react-hook/src'
import { Button, Motion, Tooltip } from '@youknown/react-ui/src'

interface BackTop {
	threshold?: number
}
export default function BackTop(props: BackTop) {
	const { threshold = window.innerHeight } = props
	const [visible, setVisible] = useState(false)
	const target = useAppContentEl()

	const handle_to_top = () => {
		target?.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	const scroll_handler = useDebounce(() => {
		if (!target) return
		setVisible(target.scrollTop > threshold)
	}, 100)

	useEffect(() => {
		if (!target) return
		target.addEventListener('scroll', scroll_handler)
		return () => {
			target.removeEventListener('scroll', scroll_handler)
		}
	}, [target, scroll_handler])

	return (
		<Tooltip title="返回顶部">
			<Motion.Zoom in={visible}>
				<Button circle size="large" className="shadow-shadow-m" onClick={handle_to_top}>
					<TbArrowBarToUp className="text-22px" />
				</Button>
			</Motion.Zoom>
		</Tooltip>
	)
}
