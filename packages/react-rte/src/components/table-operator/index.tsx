import './index.scss'

import { useControllable } from '@youknown/react-hook/src'
import { Popover, Space } from '@youknown/react-ui/src'
import { cls, omit } from '@youknown/utils/src'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { TbTableOptions } from 'react-icons/tb'

import type { ButtonProps } from '../../common'
import { UI_EDITOR_PREFIX } from '../../common'
import CommandBtn from '../command-btn'
import CellMergeBtn from './components/cell-merge-btn'
import CellSplitBtn from './components/cell-split-btn'
import TableDeleteBtn from './components/table-delete-btn'

export interface TableOperatorProps extends ButtonProps, ComponentProps<typeof Popover> {}
export default function TableOperator(props: TableOperatorProps) {
  const { editor, tooltip = true, trigger = 'click', ...rest } = omit(props, 'defaultOpen', 'open', 'onOpenChange')

  const { t } = useTranslation()
  const [open, onOpenChange] = useControllable(props, {
    defaultValue: false,
    defaultValuePropName: 'defaultOpen',
    valuePropName: 'open',
    trigger: 'onOpenChange'
  })

  const prefixCls = `${UI_EDITOR_PREFIX}-table-operator`

  const tableOperatorsPopup = (
    <Space size="small" align="center">
      <CellMergeBtn editor={editor} />
      <CellSplitBtn editor={editor} />
      <TableDeleteBtn editor={editor} />
    </Space>
  )

  return (
    <Popover
      placement="bottom"
      content={tableOperatorsPopup}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      {...rest}
    >
      <CommandBtn
        className={cls(prefixCls)}
        arrow
        tooltip={t('react_rte.table.operation')}
        tooltipDisabled={!tooltip}
        active={open}
        onCommand={() => {
          if (trigger === 'manual') {
            onOpenChange?.(!open)
          }
        }}
      >
        <TbTableOptions />
      </CommandBtn>
    </Popover>
  )
}
