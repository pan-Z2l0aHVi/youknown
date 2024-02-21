import parse, { DOMNode, domToReact, Element } from 'html-react-parser'
import { ForwardedRef, forwardRef, HTMLAttributes, useMemo } from 'react'

import { Image } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import Heading from './components/heading'

const str_to_px = (val?: string): number | undefined => (val ? +val : undefined)

interface RichTextAreaProps extends HTMLAttributes<HTMLDivElement> {
	html: string
}
const RichTextArea = forwardRef((props: RichTextAreaProps, ref: ForwardedRef<HTMLDivElement>) => {
	const { className, html } = props

	const classnames = cls(className, 'rich-text-container')

	const rich_text_content = useMemo(() => {
		return parse(html, {
			replace(domNode) {
				if (!(domNode instanceof Element)) {
					return
				}

				if (domNode.name === 'img') {
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

				if (['h1', 'h2', 'h3', 'h4'].includes(domNode.name)) {
					const level = Number(domNode.name.slice(-1))
					return <Heading level={level}>{domToReact(domNode.children as DOMNode[])}</Heading>
				}
			}
		})
	}, [html])

	return (
		<div ref={ref} className={classnames}>
			{rich_text_content}
		</div>
	)
})

export default RichTextArea
