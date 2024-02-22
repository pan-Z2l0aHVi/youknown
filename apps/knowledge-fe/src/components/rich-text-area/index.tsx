import parse, { DOMNode, domToReact, Element, Text } from 'html-react-parser'
import { ForwardedRef, forwardRef, HTMLAttributes, useMemo } from 'react'

import { Image } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import Heading from './components/heading'
import CodeBlock from './components/code-block'

const str_to_px = (val?: string): number | undefined => (val ? +val : undefined)

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

				if (node.name === 'pre' && node.firstChild instanceof Element && node.firstChild.name === 'code') {
					const code_str = node.firstChild.children
						.filter<Text>((child): child is Text => child.type === 'text')
						.map(child => child.data)
						.join('')
					const [, language] = node.firstChild.attribs.class.split('language-')
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
