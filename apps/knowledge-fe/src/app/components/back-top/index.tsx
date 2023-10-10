import { useEffect, useState } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'

import { useDebounce } from '@youknown/react-hook/src'
import { Button, Motion, Tooltip } from '@youknown/react-ui/src'
import { is } from '@youknown/utils/src'

interface BackTopProps {
	threshold?: number
	container?: Element
}
export default function BackTop(props: BackTopProps) {
	const { threshold = window.innerHeight, container = window } = props
	const [visible, setVisible] = useState(false)

	const handle_to_top = () => {
		container?.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	const scroll_handler = useDebounce(() => {
		const scrollContainer = is.window(container) ? document.documentElement : container
		setVisible(scrollContainer.scrollTop > threshold)
	}, 100)

	useEffect(() => {
		container.addEventListener('scroll', scroll_handler)
		return () => {
			container.removeEventListener('scroll', scroll_handler)
		}
	}, [container, scroll_handler])

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
