import TiptapBold, { BoldOptions } from '@tiptap/extension-bold'

import BoldBtn from '../components/bold-btn'

export default TiptapBold.extend<
	BoldOptions & {
		menu: typeof BoldBtn
		bubble: typeof BoldBtn
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			menu: BoldBtn,
			bubble: BoldBtn
		}
	}
})
