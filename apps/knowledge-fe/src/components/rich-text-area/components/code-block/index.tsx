import { HTMLAttributes } from 'react'

export default function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
	const { children, ...rest } = props
	return (
		<pre {...rest}>
			<code>{children}</code>
		</pre>
	)
}
