import TiptapHighlight, { HighlightOptions } from '@tiptap/extension-highlight'

import HighlightPicker from '../components/highlight-picker'

export default TiptapHighlight.extend<
	HighlightOptions & {
		menu: typeof HighlightPicker
		bubble: typeof HighlightPicker
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			multicolor: true,
			menu: HighlightPicker,
			bubble: HighlightPicker
		}
	}
})
