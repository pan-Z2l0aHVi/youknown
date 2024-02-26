import { ComponentProps } from 'react'

import { render as renderReactRoot } from '../../utils/renderReactRoot'
import ImageCropper from './ImageCropper'

type ImageCropperProps = ComponentProps<typeof ImageCropper>
type CropConfig = Omit<ImageCropperProps, 'open' | 'onClose'> & {
	fileTypeExcludes?: string[]
}

export const crop = (config: CropConfig) => {
	const { fileTypeExcludes = [], file } = config
	if (fileTypeExcludes.includes(file.type)) {
		config.onCrop?.(file)
		return
	}

	const div = document.createElement('div')
	document.body.appendChild(div)

	let root: ReturnType<typeof renderReactRoot> | void

	function render() {
		const ele = <ImageCropper {...imageCropperProps} />
		if (root) {
			root.render(ele)
		} else {
			root = renderReactRoot(ele, div)
			destroy()
		}
	}

	const imageCropperProps: ComponentProps<typeof ImageCropper> = {
		...config,
		open: false,
		onClose: close
	}
	open()

	function open() {
		imageCropperProps.open = true
		render()
	}

	function close() {
		imageCropperProps.open = false
		render()
	}

	function destroy() {
		if (div.parentNode) {
			div.parentNode.removeChild(div)
		}
	}

	return {
		open,
		close
	}
}
