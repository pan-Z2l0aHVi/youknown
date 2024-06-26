import './index.scss'

import type { Editor } from '@tiptap/react'
import { Dropdown } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useTranslation } from 'react-i18next'
import { PiCodeBlockBold } from 'react-icons/pi'

import { UI_EDITOR_PREFIX } from '../../common'

export default function CodeBlockItem(props: { editor: Editor }) {
  const { editor } = props
  const { t } = useTranslation()
  const prefixCls = `${UI_EDITOR_PREFIX}-code-block-btn`
  const disabled = !editor.isEditable || !editor.can().toggleCodeBlock()
  return (
    <Dropdown.Item
      prefix={
        <div
          className={cls(prefixCls, {
            active: editor.isActive('codeBlock'),
            disabled
          })}
        >
          <PiCodeBlockBold />
        </div>
      }
      disabled={disabled}
      closeAfterItemClick
      onClick={() => {
        if (disabled) return
        editor.chain().focus().toggleCodeBlock().run()
      }}
    >
      {t('react_rte.code_block')}
    </Dropdown.Item>
  )
}
