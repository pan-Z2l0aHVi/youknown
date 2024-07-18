import { BubbleMenu } from '@tiptap/react'
import { Dropdown } from '@youknown/react-ui/src'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { LuArrowDownToLine, LuArrowUpToLine } from 'react-icons/lu'
import { TbTableRow } from 'react-icons/tb'

import type { MenuProps, ShouldShowProps } from '../types'
import { isRowGripSelected } from './utils'

const TableRowMenu = memo(({ editor }: MenuProps) => {
  const { t } = useTranslation()

  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from) {
        return false
      }
      return isRowGripSelected({ editor, view, state, from })
    },
    [editor]
  )

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      tippyOptions={{
        placement: 'left',
        zIndex: 14,
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }]
        }
      }}
      shouldShow={shouldShow}
    >
      <Dropdown.Menu>
        <Dropdown.Item prefix={<LuArrowUpToLine size={18} />} onClick={onAddRowBefore}>
          {t('react_rte.table.above_insert_row')}
        </Dropdown.Item>
        <Dropdown.Item prefix={<LuArrowDownToLine size={18} />} onClick={onAddRowAfter}>
          {t('react_rte.table.below_insert_row')}
        </Dropdown.Item>
        <Dropdown.Item prefix={<TbTableRow size={18} />} onClick={onDeleteRow}>
          {t('react_rte.table.rm_row')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </BubbleMenu>
  )
})

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
