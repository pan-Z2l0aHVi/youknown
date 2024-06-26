import { mergeAttributes } from '@tiptap/core'
import type { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'

import HorizontalRuleItem from '../components/horizontal-rule-item'

export default TiptapHorizontalRule.extend<
  HorizontalRuleOptions & {
    insert: typeof HorizontalRuleItem
    floating: typeof HorizontalRuleItem
  }
>({
  renderHTML() {
    return ['div', mergeAttributes(this.options.HTMLAttributes, { 'data-type': this.name }), ['hr']]
  },
  addOptions() {
    return {
      ...this.parent?.(),
      insert: HorizontalRuleItem,
      floating: HorizontalRuleItem
    }
  }
})
