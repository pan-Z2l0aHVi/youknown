import './index.scss'

import type { Editor } from '@tiptap/react'
import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useTranslation } from 'react-i18next'
import { TbListNumbers } from 'react-icons/tb'

import { UI_EDITOR_PREFIX } from '../../common'

export default function OrderedListItem(props: { editor: Editor }) {
  const { editor } = props
  const { t } = useTranslation()
  const prefixCls = `${UI_EDITOR_PREFIX}-ordered-list-item`
  const disabled = !editor.isEditable || !editor.can().toggleOrderedList()
  return (
    <Dropdown.Item
      prefix={
        <div
          className={cls(prefixCls, {
            active: editor.isActive('orderedlist'),
            disabled
          })}
        >
          <TbListNumbers />
        </div>
      }
      closeAfterItemClick
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        editor.chain().focus().toggleOrderedList().run()
      }}
    >
      {t('react_rte.orderlist')}
    </Dropdown.Item>
  )
}
