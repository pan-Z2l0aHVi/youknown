import { isValidElement } from 'react'

import CodeBlock from '@/components/code-block'

import type { MDXComponents } from 'mdx/types'
export const components: MDXComponents = {
	pre: props => {
		if (isValidElement(props.children)) {
			const { className = '', children = '' } = props.children.props
			let language = ''
			if (className) {
				;[, language] = className.split('language-')
			}
			return <CodeBlock language={language} code={children} />
		}
	}
}
