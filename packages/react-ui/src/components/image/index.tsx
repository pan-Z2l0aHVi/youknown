import './image.scss'

import {
	Dispatch,
	ForwardedRef,
	forwardRef,
	ImgHTMLAttributes,
	MouseEventHandler,
	SetStateAction,
	useEffect,
	useRef,
	useState,
	WheelEventHandler
} from 'react'
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

import { useBoolean, useComposeRef, useEvent, useLatestRef } from '@youknown/react-hook/src'
import { cls, downloadFile, is, throttle } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Button from '../button'
import Loading from '../loading'
import Modal from '../modal'
import Motion from '../motion'
import Space from '../space'
import Tooltip from '../tooltip'

type Coordinate = {
	x: number
	y: number
} | null
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	open?: boolean
	detailSrc?: string | (() => Promise<string>)
	toolbarVisible?: boolean
	detailDisabled?: boolean
	scaleRange?: number[]
	onOpenChange?: Dispatch<SetStateAction<boolean>>
	onDownloadSuccess?: () => void
	onDownloadError?: (err: string | Event) => void
}

const Image = (props: ImageProps, propRef: ForwardedRef<HTMLImageElement>) => {
	const {
		className,
		src = '',
		detailSrc = src,
		open = false,
		toolbarVisible = true,
		detailDisabled = false,
		scaleRange = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 8],
		onOpenChange,
		onClick,
		onDownloadSuccess,
		onDownloadError,
		...rest
	} = props

	const innerRef = useRef<HTMLImageElement>(null)
	const imgRef = useComposeRef(propRef, innerRef)
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
	const [_detailSrc, _setDetailSrc] = useState('')
	const [dragging, setDragging] = useState(false)
	const draggingRef = useLatestRef(dragging)

	const [detailOpen, setDetailOpen] = useState(false)
	const showDetail = useEvent(() => {
		setDetailOpen(true)
		onOpenChange?.(true)
	})
	const hideDetail = useEvent(() => {
		setDetailOpen(false)
		onOpenChange?.(false)
	})

	useEffect(() => {
		if (open) {
			showDetail()
		} else {
			hideDetail()
		}
	}, [hideDetail, open, showDetail])

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

		if (_detailSrc) {
			downloadFile(_detailSrc, 'wallpaper')
		}
	}

	const handleWheel: WheelEventHandler<HTMLElement> = event => {
		if (dragging) return
		if (event.deltaY < 0) {
			handleZoomOut()
		} else {
			handleZoomIn()
		}
	}

	// 无感知重置
	const resetTimerRef = useRef(0)
	useEffect(() => {
		if (detailOpen) {
			clearTimeout(resetTimerRef.current)
		} else {
			const DELAY = 1000
			resetTimerRef.current = window.setTimeout(() => {
				handleReset()
			}, DELAY)
		}
	}, [detailOpen, handleReset])

	const prefixCls = `${UI_PREFIX}-image`
	const scalePercent = `${scale * 100}%`

	const toolbarList = [
		{
			id: 'download',
			title: '下载',
			icon: <TbDownload className={`${prefixCls}-detail-icon`} />,
			handler: handleDownload
		},
		{
			id: 'left-rotate',
			title: '逆时针旋转',
			icon: <TbRotate className={`${prefixCls}-detail-icon`} />,
			handler: handleLeftRotate
		},
		{
			id: 'right-rotate',
			title: '顺时针旋转',
			icon: <TbRotateClockwise className={`${prefixCls}-detail-icon`} />,
			handler: handleRightRotate
		},
		{
			id: 'shrink',
			title: '缩小',
			icon: <TbZoomOut className={`${prefixCls}-detail-icon`} />,
			handler: handleZoomOut
		},
		{
			id: 'swell',
			title: '放大',
			icon: <TbZoomIn className={`${prefixCls}-detail-icon`} />,
			handler: handleZoomIn
		},
		{
			id: 'reset',
			title: '恢复初始尺寸',
			icon: <TbRelationOneToOne className={`${prefixCls}-detail-icon`} />,
			handler: handleReset
		},
		{
			id: 'close',
			title: '关闭',
			icon: <TbX className={`${prefixCls}-detail-icon`} />,
			handler: hideDetail
		}
	]

	const detailLoading = !_detailSrc || !detailLoaded
	const operationDisabled = detailLoading || detailError
	const toolbarEle = (
		<Motion.Slide in={toolbarVisible} direction="up">
			<div className={`${prefixCls}-detail-toolbar`}>
				<Space size="small">
					{toolbarList.map(item => (
						<Tooltip key={item.id} spacing={12} placement="top" title={item.title}>
							<Button
								className={cls(`${prefixCls}-detail-icon-wrap`, {
									[`${prefixCls}-detail-icon-wrap-disabled`]: operationDisabled
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

	const detailEle = detailDisabled || (
		<Modal open={detailOpen} onCancel={hideDetail} onWheel={throttle(handleWheel, 200)}>
			<div
				className={`${prefixCls}-detail`}
				onClick={event => {
					// scale < 1 时，外层 detail 的宽高不变，点击 detail 也需要关闭弹窗。
					if (event.target === event.currentTarget) {
						hideDetail()
					}
				}}
			>
				<div className={`${prefixCls}-detail-loading-icon`}>
					<Loading spinning={detailLoading} bordered size="large" />
				</div>

				{detailError ? (
					<div className={`${prefixCls}-detail-fallback`}>
						<TbPhotoX />
					</div>
				) : (
					<img
						ref={imgDetailRef}
						className={cls(`${prefixCls}-detail-pic`, {
							[`${prefixCls}-detail-pic-loaded`]: !detailLoading
						})}
						src={_detailSrc}
						loading="lazy"
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
						onLoad={handleDetailLoaded}
						onError={handleDetailError}
						onClick={() => {
							if (detailLoading) {
								hideDetail()
							}
						}}
					/>
				)}
			</div>
			{ratioVisible && <div className={`${prefixCls}-detail-ratio`}>{scalePercent}</div>}
			{toolbarEle}
		</Modal>
	)

	return (
		<>
			<img
				className={cls(className, prefixCls, {
					[`${prefixCls}-disabled`]: detailDisabled
				})}
				ref={imgRef}
				src={src}
				onClick={event => {
					onClick?.(event)

					if (is.string(detailSrc)) {
						_setDetailSrc(detailSrc)
						showDetail()
						onOpenChange?.(true)
					} else {
						detailSrc().then(url => {
							_setDetailSrc(url)
							showDetail()
							onOpenChange?.(true)
						})
					}
				}}
				{...rest}
			/>
			{detailEle}
		</>
	)
}
Image.displayName = 'Image'
const RefImage = forwardRef(Image)
export default RefImage
