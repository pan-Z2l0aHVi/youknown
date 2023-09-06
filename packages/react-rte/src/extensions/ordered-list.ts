import TiptapOrderedList, { OrderedListOptions } from '@tiptap/extension-ordered-list'

import OrderedListItem from '../components/ordered-list-item'

export default TiptapOrderedList.extend<
	OrderedListOptions & {
		insert: typeof OrderedListItem
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			insert: OrderedListItem
		}
	}
})
