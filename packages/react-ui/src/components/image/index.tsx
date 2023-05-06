import Motion from '../motion'
import { useBoolean, useComposeRef, useLatestRef } from '@youknown/react-hook/src'
import { cls, downloadFile, is, throttle } from '@youknown/utils/src'
import React, {
	forwardRef,
	ImgHTMLAttributes,
	MouseEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
	WheelEventHandler
} from 'react'
import './image.scss'
import { UI_PREFIX } from '../../constants'
import Space from '../space'
import Modal from '../modal'
import Tooltip from '../tooltip'
import Loading from '../loading'
import { TbDownload, TbRelationOneToOne, TbRotate, TbRotateClockwise, TbX, TbZoomIn, TbZoomOut } from 'react-icons/tb'
import Button from '../button'

type Coordinate = {
	x: number
	y: number
} | null
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	detailSrc?: string | (() => Promise<string>)
	toolbarVisible?: boolean
	detailDisabled?: boolean
	scaleRange?: number[]
}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, propRef) => {
	const {
		className,
		src = '',
		detailSrc = src,
		toolbarVisible = true,
		detailDisabled = false,
		scaleRange = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 8],
		onClick,
		...rest
	} = props

	const innerRef = useRef<HTMLImageElement>(null)
	const imgRef = useComposeRef(propRef, innerRef)
	const imgDetailRef = useRef<HTMLImageElement>(null)

	const [detailOpen, { setTrue: showDetail, setFalse: hideDetail }] = useBoolean(false)

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

	const updateScale = useCallback(
		(mapState: (state: number) => number) => {
			setScaleIndex(preScaleIndex => {
				const nextScaleIndex = mapState(preScaleIndex)
				if (nextScaleIndex >= 0 && nextScaleIndex < scaleRangeRef.current.length) {
					return nextScaleIndex
				}
				return preScaleIndex
			})
		},
		[scaleRangeRef]
	)

	const handleReset = useCallback(() => {
		if (!detailLoaded) return

		updateScale(() => originalScaleIndex)
		setRotate(0)
		setOffset(null)
	}, [detailLoaded, originalScaleIndex, updateScale])

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
			downloadFile(_detailSrc)
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
			id: 0,
			title: '下载',
			icon: <TbDownload className={`${prefixCls}-detail-icon`} />,
			handler: handleDownload
		},
		{
			id: 1,
			title: '逆时针旋转',
			icon: <TbRotate className={`${prefixCls}-detail-icon`} />,
			handler: handleLeftRotate
		},
		{
			id: 2,
			title: '顺时针旋转',
			icon: <TbRotateClockwise className={`${prefixCls}-detail-icon`} />,
			handler: handleRightRotate
		},
		{
			id: 3,
			title: '缩小',
			icon: <TbZoomOut className={`${prefixCls}-detail-icon`} />,
			handler: handleZoomOut
		},
		{
			id: 4,
			title: '放大',
			icon: <TbZoomIn className={`${prefixCls}-detail-icon`} />,
			handler: handleZoomIn
		},
		{
			id: 5,
			title: '恢复原始尺寸',
			icon: <TbRelationOneToOne className={`${prefixCls}-detail-icon`} />,
			handler: handleReset
		},
		{
			id: 6,
			title: '关闭',
			icon: <TbX className={`${prefixCls}-detail-icon`} />,
			handler: hideDetail
		}
	]

	const detailLoading = !_detailSrc || !detailLoaded
	const toolbarEle = (
		<Motion.Slide in={toolbarVisible} direction="up">
			<div className={`${prefixCls}-detail-toolbar`}>
				<Space size="small">
					{toolbarList.map(item => (
						<Tooltip key={item.id} spacing={12} placement="top" title={item.title}>
							<Button
								className={`${prefixCls}-detail-icon-wrap`}
								circle
								text
								disabled={detailLoading}
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
		<Modal open={detailOpen} onCancel={hideDetail} onWheel={throttle(handleWheel, 100)}>
			<div
				className={`${prefixCls}-detail`}
				onClick={event => {
					// scale < 1 时，外层 detail 的宽高不变，点击 detail 也需要关闭弹窗。
					if (event.target === event.currentTarget) {
						hideDetail()
					}
				}}
			>
				{detailLoading && <Loading className={`${prefixCls}-detail-loading-icon`} size="large" />}

				<img
					ref={imgDetailRef}
					className={cls(`${prefixCls}-detail-pic`, {
						[`${prefixCls}-detail-pic-loaded`]: !detailLoading
					})}
					src={_detailSrc}
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
					onClick={() => {
						if (detailLoading) {
							hideDetail()
						}
					}}
				/>
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
					} else {
						detailSrc().then(url => {
							_setDetailSrc(url)
							showDetail()
						})
					}
				}}
				{...rest}
			/>
			{detailEle}
		</>
	)
})
Image.displayName = 'Image'
export default Image
