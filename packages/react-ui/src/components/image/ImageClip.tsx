import 'cropperjs/dist/cropper.css'
import './image-clip.scss'

import { useRef } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import { TbCheck, TbRefreshDot, TbRotate, TbRotateClockwise, TbX } from 'react-icons/tb'

import { base64ToFile } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Button from '../button'
import Overlay from '../overlay'
import Tooltip from '../tooltip'

interface ImageClipProps {
	file: File
	open?: boolean
	onClose?: () => void
	onClip?: (result: File) => void
	onCancel?: () => void
	aspectRatio?: number
	initialAspectRatio?: number
}
export default function ImageClip(props: ImageClipProps) {
	const { open, onClose, file, onClip, onCancel, aspectRatio, initialAspectRatio } = props
	const cropperRef = useRef<ReactCropperElement>(null)

	const src = window.URL.createObjectURL(file)

	const prefixCls = `${UI_PREFIX}-image-clip`
	const toolbarList = [
		{
			id: 'left-rotate',
			title: '逆时针旋转',
			icon: <TbRotate className={`${prefixCls}-icon`} />,
			handler: () => {
				cropperRef.current?.cropper.rotate(90)
			}
		},
		{
			id: 'right-rotate',
			title: '顺时针旋转',
			icon: <TbRotateClockwise className={`${prefixCls}-icon`} />,
			handler: () => {
				cropperRef.current?.cropper.rotate(-90)
			}
		},
		{
			id: 'reset',
			title: '重置',
			icon: <TbRefreshDot className={`${prefixCls}-icon`} />,
			handler: () => {
				cropperRef.current?.cropper.reset()
			}
		},
		{
			id: 'save',
			title: '保存',
			icon: <TbCheck className={`${prefixCls}-icon`} />,
			handler: () => {
				const cropper = cropperRef.current?.cropper
				const base64 = cropper?.getCroppedCanvas().toDataURL() ?? ''
				cropper?.destroy()
				const result = base64ToFile(base64, file.name, file.type)
				onClip?.(result)
				onClose?.()
			}
		},
		{
			id: 'close',
			title: '关闭',
			icon: <TbX className={`${prefixCls}-icon`} />,
			handler: () => {
				cropperRef.current?.cropper.destroy()
				onCancel?.()
				onClose?.()
			}
		}
	]

	const toolbarEle = (
		<div className={`${prefixCls}-toolbar`}>
			{toolbarList.map(operator => {
				return (
					<Tooltip key={operator.id} title={operator.title}>
						<Button className={`${prefixCls}-toolbar-operator`} onClick={operator.handler}>
							{operator.icon}
						</Button>
					</Tooltip>
				)
			})}
		</div>
	)
	return (
		<Overlay style={{ background: '#000' }} unmountOnExit open={open} onCancel={onClose}>
			<div className={prefixCls}>
				<Cropper
					ref={cropperRef}
					className={`${prefixCls}-cropper`}
					src={src}
					initialAspectRatio={initialAspectRatio}
					aspectRatio={aspectRatio}
					viewMode={1}
					dragMode="move"
					minCropBoxHeight={40}
					minCropBoxWidth={40}
					background={false}
					checkOrientation={false}
					toggleDragModeOnDblclick={false}
				/>
				{toolbarEle}
			</div>
		</Overlay>
	)
}
ImageClip.displayName = 'ImageClip'
