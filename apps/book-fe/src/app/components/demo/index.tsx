import { Anchor } from '@youknown/react-ui/src'
import { AnchorItem } from '@youknown/react-ui/src/components/anchor'
import { cls, uuid } from '@youknown/utils/src'
import { MDXComponents } from 'mdx/types'
import { ComponentType, isValidElement, ReactNode, useMemo, useRef } from 'react'

import CodeBlock from '@/components/code-block'
import Heading from '@/components/heading'
import { useUIStore } from '@/stores'

import Header from '../header'

export interface DemoProps {
	heading: ReactNode
	component: ComponentType<{ components: MDXComponents }>
	anchor_visible?: boolean
}
export default function Demo(props: DemoProps) {
	const { heading, component: Component, anchor_visible = true } = props

	const is_mobile = useUIStore(state => state.is_mobile)
	const anchor_items_ref = useRef<AnchorItem[]>([])

	const components: MDXComponents = useMemo(() => {
		anchor_items_ref.current = []
		return {
			pre: props => {
				if (isValidElement(props.children)) {
					const { className = '', children = '' } = props.children.props
					let language = ''
					if (className) {
						;[, language] = className.split('language-')
					}
					return <CodeBlock language={language} code={children} />
				}
			},
			h1: ({ children }) => <Heading level={1}>{children}</Heading>,
			h2: ({ children }) => {
				const labelledby = uuid()
				anchor_items_ref.current.push({
					labelledby,
					content: children,
					children: []
				})
				return (
					<Heading level={2} labelledby={labelledby}>
						{children}
					</Heading>
				)
			},
			h3: ({ children }) => {
				const len = anchor_items_ref.current.length
				const parent = anchor_items_ref.current[len - 1]
				const labelledby = uuid()
				parent.children?.push({
					labelledby,
					content: children
				})
				return (
					<Heading level={3} labelledby={labelledby}>
						{children}
					</Heading>
				)
			},
			h4: ({ children }) => <Heading level={4}>{children}</Heading>
		}
	}, [])

	const with_anchor = anchor_visible && !is_mobile

	return (
		<>
			<Header heading={heading}></Header>

			<div
				className={cls('rich-text-container sm:p-32px <sm:p-16px! sm:m-[0_auto] sm:w-960px', {
					flex: with_anchor
				})}
			>
				{with_anchor ? (
					<>
						<div className="flex-1">
							<Component components={components} />
						</div>
						<Anchor
							className="sticky top-120px w-200px max-h-60vh h-max overflow-y-auto ml-40px"
							offsetY={56}
							items={anchor_items_ref.current}
						/>
					</>
				) : (
					<Component components={components} />
				)}
			</div>
		</>
	)
}
