import TiptapUnderline, { UnderlineOptions } from '@tiptap/extension-underline'

import UnderlineBtn from '../components/underline-btn'

export default TiptapUnderline.extend<
	UnderlineOptions & {
		menu: typeof UnderlineBtn
		bubble: typeof UnderlineBtn
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			menu: UnderlineBtn,
			bubble: UnderlineBtn
		}
	}
})
