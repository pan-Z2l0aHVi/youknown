import TiptapHorizontalRule, { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'

import HorizontalRuleItem from '../components/horizontal-rule-item'

export default TiptapHorizontalRule.extend<
	HorizontalRuleOptions & {
		insert: typeof HorizontalRuleItem
	}
>({
	addOptions() {
		return {
			...this.parent?.(),
			insert: HorizontalRuleItem
		}
	}
})
