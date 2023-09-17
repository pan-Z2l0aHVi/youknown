import TiptapBlockquote, { BlockquoteOptions } from '@tiptap/extension-blockquote'

import BlockquoteItem from '../components/blockquote-item'

export default TiptapBlockquote.extend<
	BlockquoteOptions & {
		insert: typeof BlockquoteItem
		floating: typeof BlockquoteItem
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			insert: BlockquoteItem,
			floating: BlockquoteItem
		}
	}
})
