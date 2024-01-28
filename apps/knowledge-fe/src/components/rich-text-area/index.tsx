import parse, { Element } from 'html-react-parser'
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react'

import { Image } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

const str_to_px = (val?: string): number | undefined => (val ? +val : undefined)

interface RichTextAreaProps extends HTMLAttributes<HTMLDivElement> {
	html: string
}
const RichTextArea = forwardRef((props: RichTextAreaProps, ref: ForwardedRef<HTMLDivElement>) => {
	const { className, html } = props

	const classnames = cls(className, 'rich-text-container')

	return (
		<div ref={ref} className={classnames}>
			{parse(html, {
				replace(domNode) {
					if (domNode instanceof Element && domNode.name === 'img') {
						const { src, width, height } = domNode.attribs
						return (
							<Image
								canPreview
								src={src}
								style={{
									width: str_to_px(width),
									height: str_to_px(height)
								}}
							/>
						)
					}
				}
			})}
		</div>
	)
})

export default RichTextArea
