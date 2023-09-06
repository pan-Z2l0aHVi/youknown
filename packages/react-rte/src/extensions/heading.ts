import TiptapHeading, { HeadingOptions } from '@tiptap/extension-heading'

import HeadingPicker from '../components/heading-picker'

export default TiptapHeading.extend<
	HeadingOptions & {
		menu: typeof HeadingPicker
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			menu: HeadingPicker,
			levels: [1, 2, 3, 4]
		}
	}
})
