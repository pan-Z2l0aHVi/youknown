import TiptapCodeBlock, { CodeBlockOptions } from '@tiptap/extension-code-block'

import CodeBlockItem from '../components/code-block-item'

export default TiptapCodeBlock.extend<
	CodeBlockOptions & {
		insert: typeof CodeBlockItem
		floating: typeof CodeBlockItem
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			insert: CodeBlockItem,
			floating: CodeBlockItem
		}
	}
})
