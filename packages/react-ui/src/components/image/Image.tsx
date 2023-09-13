import './image.scss'

import { ForwardedRef, forwardRef, ImgHTMLAttributes, useEffect, useRef } from 'react'

import { useComposeRef, useEvent } from '@youknown/react-hook/src'
import { ArgumentType, cls, is } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import { preview } from './preview'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, Omit<ArgumentType<typeof preview>, 'url'> {
	src: string
	previewSrc?: string | (() => Promise<string>)
	previewDisabled?: boolean
}

const Image = (props: ImageProps, propRef: ForwardedRef<HTMLImageElement>) => {
	const {
		className,
		src = '',
		previewSrc = src,
		previewDisabled = false,
		toolbarVisible,
		scaleRange,
		onDownloadSuccess,
		onDownloadError,
		onClick,
		...rest
	} = props

	const innerRef = useRef<HTMLImageElement>(null)
	const imgRef = useComposeRef(propRef, innerRef)

	const previewInstRef = useRef<ReturnType<typeof preview>>()
	const showDetail = useEvent((url: string) => {
		if (!previewInstRef.current) {
			previewInstRef.current = preview({
				url,
				toolbarVisible,
				scaleRange,
				onDownloadSuccess,
				onDownloadError
			})
		} else {
			previewInstRef.current.open()
		}
	})

	useEffect(
		() => () => {
			if (previewInstRef.current) {
				previewInstRef.current.close()
			}
		},
		[]
	)

	const prefixCls = `${UI_PREFIX}-image`

	return (
		<img
			className={cls(className, prefixCls, {
				[`${prefixCls}-disabled`]: previewDisabled
			})}
			ref={imgRef}
			src={src}
			onClick={event => {
				onClick?.(event)

				if (is.string(previewSrc)) {
					showDetail(previewSrc)
				} else {
					previewSrc().then(url => {
						showDetail(url)
					})
				}
			}}
			{...rest}
		/>
	)
}
Image.displayName = 'Image'
const RefImage = forwardRef(Image)
export default RefImage
