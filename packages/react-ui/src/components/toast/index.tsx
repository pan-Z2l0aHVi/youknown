import { ComponentProps, CSSProperties, MouseEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCircleXmark } from 'react-icons/fa6'

import { uuid } from '@youknown/utils/src'

import { render as renderReactRoot } from '../../utils/renderReactRoot'
import Toast from './Toast'

interface ToastConfig {
	content: ReactNode
	duration?: number
	className?: string
	style?: CSSProperties
	icon?: ReactNode
	onClick?: (event: MouseEvent) => void
	onClose?: () => void
}
let root: ReturnType<typeof renderReactRoot> | void
let noticeList: ComponentProps<typeof Toast>['noticeList'] = []

const toast = (config: ToastConfig) => {
	const noticeID = uuid()

	function render() {
		const ele = createPortal(<Toast noticeList={noticeList} onNoticeClose={remove} />, document.body)
		if (root) {
			root.render(ele)
		} else {
			const div = document.createElement('div')
			document.body.appendChild(div)
			root = renderReactRoot(ele, div)
			if (div.parentNode) {
				div.parentNode.removeChild(div)
			}
		}
	}

	noticeList.push({ id: noticeID, ...config })
	render()

	function remove(id: string | number) {
		noticeList = noticeList.filter(notice => notice.id !== id)
		render()
	}

	function close() {
		remove(noticeID)
	}

	function update(newConfig: ToastConfig) {
		noticeList = noticeList.map(notice => {
			if (notice.id === noticeID) {
				return {
					id: noticeID,
					...newConfig
				}
			}
			return notice
		})
		render()
	}

	return {
		noticeID,
		update,
		close
	}
}

toast.info = (config: ToastConfig) => {
	return toast({
		icon: <FaCircleInfo color="#165dff" />,
		...config
	})
}
toast.success = (config: ToastConfig) => {
	return toast({
		icon: <FaCircleCheck color="#00b42a" />,
		...config
	})
}
toast.warning = (config: ToastConfig) => {
	return toast({
		icon: <FaCircleExclamation color="#ff7d00" />,
		...config
	})
}
toast.error = (config: ToastConfig) => {
	return toast({
		icon: <FaCircleXmark color="#f53f3f" />,
		...config
	})
}

export default toast
