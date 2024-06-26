import { BubbleMenu } from '@tiptap/react'
import { Dropdown } from '@youknown/react-ui/src'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { LuArrowLeftToLine, LuArrowRightToLine } from 'react-icons/lu'
import { TbTableColumn } from 'react-icons/tb'

import type { MenuProps, ShouldShowProps } from '../types'
import { isColumnGripSelected } from './utils'

const TableColumnMenu = memo(({ editor }: MenuProps) => {
  const { t } = useTranslation()

  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state) {
        return false
      }
      return isColumnGripSelected({ editor, view, state, from: from || 0 })
    },
    [editor]
  )

  const onAddColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const onAddColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableColumnMenu"
      updateDelay={0}
      tippyOptions={{
        placement: 'top',
        zIndex: 8,
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }]
        }
      }}
      shouldShow={shouldShow}
    >
      <Dropdown.Menu>
        <Dropdown.Item prefix={<LuArrowLeftToLine size={18} />} onClick={onAddColumnBefore}>
          {t('react_rte.table.left_insert_col')}
        </Dropdown.Item>
        <Dropdown.Item prefix={<LuArrowRightToLine size={18} />} onClick={onAddColumnAfter}>
          {t('react_rte.table.right_insert_col')}
        </Dropdown.Item>
        <Dropdown.Item prefix={<TbTableColumn size={18} />} onClick={onDeleteColumn}>
          {t('react_rte.table.rm_col')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </BubbleMenu>
  )
})

TableColumnMenu.displayName = 'TableColumnMenu'

export default TableColumnMenu
