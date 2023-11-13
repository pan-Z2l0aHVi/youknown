import './image-preview.scss'

import { MouseEventHandler, ReactEventHandler, useEffect, useRef, useState, WheelEventHandler } from 'react'
import {
	TbDownload,
	TbPhotoX,
	TbRelationOneToOne,
	TbRotate,
	TbRotateClockwise,
	TbX,
	TbZoomIn,
	TbZoomOut
} from 'react-icons/tb'

import { useBoolean, useEvent, useLatestRef, useThrottle } from '@youknown/react-hook/src'
import { cls, downloadFile } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Button from '../button'
import Loading from '../loading'
import Motion from '../motion'
import Overlay from '../overlay'
import Space from '../space'
import Tooltip from '../tooltip'

type Coordinate = {
	x: number
	y: number
} | null
interface ImagePreviewProps {
	src?: string
	toolbarVisible?: boolean
	scaleRange?: number[]
	unmountOnExit?: boolean
	open: boolean
	onClose: () => void
	onLoad?: ReactEventHandler<HTMLImageElement>
	onError?: ReactEventHandler<HTMLImageElement>
	onDownloadSuccess?: () => void
	onDownloadError?: (err: string | Event) => void
}

const ImagePreview = (props: ImagePreviewProps) => {
	const {
		src = '',
		open = false,
		toolbarVisible = true,
		scaleRange = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 8],
		unmountOnExit = true,
		onClose,
		onLoad,
		onError,
		onDownloadSuccess,
		onDownloadError
	} = props

	const imgDetailRef = useRef<HTMLImageElement>(null)
	const [detailError, setDetailError] = useState(false)

	const scaleRangeRef = useLatestRef(scaleRange)
	const originalScaleIndex = scaleRangeRef.current.indexOf(1)
	const [scaleIndex, setScaleIndex] = useState(originalScaleIndex)
	const scale = scaleRangeRef.current[scaleIndex]

	const [rotate, setRotate] = useState(0)
	const [offset, setOffset] = useState<Coordinate>(null)
	const [ratioVisible, { setTrue: showRatio, setFalse: hideRatio }] = useBoolean(false)
	const delayTimerRef = useRef(0)

	const [detailLoaded, { setTrue: handleDetailLoaded }] = useBoolean(false)
	const [dragging, setDragging] = useState(false)
	const draggingRef = useLatestRef(dragging)

	const handleDetailError = () => {
		handleDetailLoaded()
		setDetailError(true)
	}

	const handleDragDetailStart: MouseEventHandler<HTMLImageElement> = event => {
		setDragging(true)
		let pos: Coordinate = null
		if (imgDetailRef.current)
			pos = {
				x: event.pageX - imgDetailRef.current.offsetLeft,
				y: event.pageY - imgDetailRef.current.offsetTop
			}
		const handleMove = (event: MouseEvent) => {
			if (draggingRef.current && pos)
				setOffset({
					x: event.pageX - pos.x,
					y: event.pageY - pos.y
				})
		}
		const handleUp = () => {
			setDragging(false)
			document.removeEventListener('mousemove', handleMove)
			document.removeEventListener('mouseup', handleUp)
		}
		document.addEventListener('mousemove', handleMove)
		document.addEventListener('mouseup', handleUp)
	}

	const updateScale = useEvent((mapState: (state: number) => number) => {
		setScaleIndex(preScaleIndex => {
			const nextScaleIndex = mapState(preScaleIndex)
			if (nextScaleIndex >= 0 && nextScaleIndex < scaleRangeRef.current.length) {
				return nextScaleIndex
			}
			return preScaleIndex
		})
	})

	const handleReset = useEvent(() => {
		if (!detailLoaded) return

		updateScale(() => originalScaleIndex)
		setRotate(0)
		setOffset(null)
	})

	const handleShowRatio = () => {
		if (!detailLoaded) return

		showRatio()

		const ONE_SECOND = 1000
		clearTimeout(delayTimerRef.current)
		delayTimerRef.current = window.setTimeout(() => {
			hideRatio()
		}, ONE_SECOND)
	}

	const handleZoomIn = () => {
		if (!detailLoaded) return

		updateScale(p => p + 1)
		handleShowRatio()
	}
	const handleZoomOut = () => {
		if (!detailLoaded) return

		updateScale(p => p - 1)
		handleShowRatio()
	}

	const handleLeftRotate = () => {
		if (!detailLoaded) return

		setRotate(p => p - 90)
	}

	const handleRightRotate = () => {
		if (!detailLoaded) return

		setRotate(p => p + 90)
	}

	const handleDownload = () => {
		if (!detailLoaded) return

		if (src) {
			downloadFile(src, 'wallpaper').then(onDownloadSuccess).catch(onDownloadError)
		}
	}

	const handleWheel: WheelEventHandler<HTMLElement> = useThrottle(event => {
		if (dragging) return
		if (event.deltaY < 0) {
			handleZoomOut()
		} else {
			handleZoomIn()
		}
	}, 100)

	// 无感知重置
	const resetTimerRef = useRef(0)
	useEffect(() => {
		if (open) {
			clearTimeout(resetTimerRef.current)
		} else {
			const DELAY = 1000
			resetTimerRef.current = window.setTimeout(() => {
				handleReset()
			}, DELAY)
		}
	}, [open, handleReset])

	const prefixCls = `${UI_PREFIX}-image-preview`
	const scalePercent = `${scale * 100}%`

	const toolbarList = [
		{
			id: 'download',
			title: '下载',
			icon: <TbDownload className={`${prefixCls}-icon`} />,
			handler: handleDownload
		},
		{
			id: 'left-rotate',
			title: '逆时针旋转',
			icon: <TbRotate className={`${prefixCls}-icon`} />,
			handler: handleLeftRotate
		},
		{
			id: 'right-rotate',
			title: '顺时针旋转',
			icon: <TbRotateClockwise className={`${prefixCls}-icon`} />,
			handler: handleRightRotate
		},
		{
			id: 'shrink',
			title: '缩小',
			icon: <TbZoomOut className={`${prefixCls}-icon`} />,
			handler: handleZoomOut
		},
		{
			id: 'swell',
			title: '放大',
			icon: <TbZoomIn className={`${prefixCls}-icon`} />,
			handler: handleZoomIn
		},
		{
			id: 'reset',
			title: '恢复初始尺寸',
			icon: <TbRelationOneToOne className={`${prefixCls}-icon`} />,
			handler: handleReset
		},
		{
			id: 'close',
			title: '关闭',
			icon: <TbX className={`${prefixCls}-icon`} />,
			handler: onClose
		}
	]

	const detailLoading = !src || !detailLoaded
	const operationDisabled = detailLoading || detailError
	const toolbarEle = (
		<Motion.Slide in={toolbarVisible} direction="up">
			<div className={`${prefixCls}-toolbar`}>
				<Space size="small">
					{toolbarList.map(item => (
						<Tooltip key={item.id} appendTo={null} spacing={12} placement="top" title={item.title}>
							<Button
								className={cls(`${prefixCls}-icon-wrap`, {
									[`${prefixCls}-icon-wrap-disabled`]: operationDisabled
								})}
								circle
								text
								disabled={item.id !== 'close' && operationDisabled}
								onClick={item.handler}
							>
								{item.icon}
							</Button>
						</Tooltip>
					))}
				</Space>
			</div>
		</Motion.Slide>
	)

	return (
		<Overlay unmountOnExit={unmountOnExit} open={open} onCancel={onClose} onWheel={handleWheel}>
			<div
				className={`${prefixCls}`}
				onClick={event => {
					// scale < 1 时，外层 detail 的宽高不变，点击 detail 也需要关闭弹窗。
					if (event.target === event.currentTarget) {
						onClose?.()
					}
				}}
			>
				<div className={`${prefixCls}-loading-icon`}>
					<Loading spinning={detailLoading} bordered size="large" />
				</div>

				{detailError ? (
					<div className={`${prefixCls}-fallback`}>
						<TbPhotoX />
					</div>
				) : (
					<img
						ref={imgDetailRef}
						className={cls(`${prefixCls}-pic`, {
							[`${prefixCls}-pic-loaded`]: !detailLoading
						})}
						src={src}
						draggable={false}
						style={{
							transform: `scale(${scale}) rotate(${rotate}deg)`,
							...(offset
								? {
										position: 'fixed',
										left: offset.x,
										top: offset.y
								  }
								: {})
						}}
						onMouseDown={handleDragDetailStart}
						onLoad={event => {
							onLoad?.(event)
							handleDetailLoaded()
						}}
						onError={event => {
							onError?.(event)
							handleDetailError()
						}}
						onClick={() => {
							if (detailLoading) {
								onClose?.()
							}
						}}
					/>
				)}
			</div>
			{ratioVisible && <div className={`${prefixCls}-ratio`}>{scalePercent}</div>}
			{toolbarEle}
		</Overlay>
	)
}
ImagePreview.displayName = 'ImagePreview'
export default ImagePreview
