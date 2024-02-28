import '@youknown/css/src/rte.scss'

import { isValidElement } from 'react'

import ButtonMDX from './button.mdx'
import CodeBlock from './code-block'

import type { MDXComponents } from 'mdx/types'
const components: MDXComponents = {
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

export default () => {
	return (
		<div className="rich-text-container">
			<ButtonMDX components={components} />
		</div>
	)
}
