import parse, { DOMNode, domToReact, Element, Text } from 'html-react-parser'
import { ForwardedRef, forwardRef, HTMLAttributes, useMemo } from 'react'

import { Image } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

import CodeBlock from './components/code-block'
import Heading from './components/heading'
import GIFLazyImage from './components/gif-lazy-img'

interface RichTextAreaProps extends HTMLAttributes<HTMLDivElement> {
	html: string
}
const RichTextArea = forwardRef((props: RichTextAreaProps, ref: ForwardedRef<HTMLDivElement>) => {
	const { className, html } = props

	const classnames = cls(className, 'rich-text-container')

	const rich_text_content = useMemo(() => {
		return parse(html, {
			replace(node) {
				if (!(node instanceof Element)) {
					return
				}

				if (['h1', 'h2', 'h3', 'h4'].includes(node.name)) {
					const level = Number(node.name.slice(-1))
					return <Heading level={level}>{domToReact(node.children as DOMNode[])}</Heading>
				}

				if (node.name === 'img') {
					const { src, width, height } = node.attribs
					if (src.endsWith('.gif')) {
						return (
							<GIFLazyImage
								src={src}
								style={{
									width: parseFloat(width),
									height: parseFloat(height)
								}}
							/>
						)
					}

					return (
						<Image
							canPreview
							src={src}
							style={{
								width: parseFloat(width),
								height: parseFloat(height)
							}}
						/>
					)
				}

				if (node.name === 'pre' && node.firstChild instanceof Element && node.firstChild.name === 'code') {
					const code_str = node.firstChild.children
						.filter<Text>((child): child is Text => child.type === 'text')
						.map(child => child.data)
						.join('')

					let language = ''
					const language_cls = node.firstChild.attribs?.class ?? ''
					if (language_cls) {
						;[, language] = language_cls.split('language-')
					}
					return <CodeBlock language={language} code={code_str} />
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
