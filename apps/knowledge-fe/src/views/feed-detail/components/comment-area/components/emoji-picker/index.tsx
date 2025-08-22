import type { Editor } from '@youknown/react-rte'
import { Button, Divider, Image, Popover, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiSolidChevronDown } from 'react-icons/bi'
import { HiOutlineEmojiHappy } from 'react-icons/hi'

import { transform_img_cdn } from '@/utils/cloudflare'
import { customEmojis } from '@/utils/emojis'

const { emojis } = await import('@tiptap/extension-emoji')

interface EmojiPickerProps {
  editor: Editor
}

export default function EmojiPicker(props: EmojiPickerProps) {
  const { editor } = props
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const setEmojiDisabled = !editor.isEditable || !editor.can().setEmoji(emojis[0]?.name)

  const contentEle = (
    <div className="flex flex-wrap w-256px max-h-280px scrollbar scrollbar-rounded">
      {customEmojis.map(emoji => {
        return (
          <Image
            key={emoji.name}
            src={transform_img_cdn(emoji.fallbackImage!, { w: 48, h: 48, fit: 'cover' })}
            previewSrc={emoji.fallbackImage!}
            className="w-48px h-48px rd-radius-m p-4px
            cursor-pointer [@media(hover:hover)]-hover-bg-hover active-bg-active! custom-focus-outline select-none"
            onClick={() => {
              editor.chain().focus().setEmoji(emoji.name).run()
            }}
          />
        )
      })}
      {customEmojis.length > 0 && <Divider size="small" />}
      {emojis.map(emoji => {
        return (
          <Button
            key={emoji.name}
            className="text-16px!"
            text
            size="small"
            square
            onClick={() => {
              editor.chain().focus().setEmoji(emoji.name).run()
            }}
          >
            {emoji.emoji}
          </Button>
        )
      })}
    </div>
  )

  return (
    <Popover
      disabled={setEmojiDisabled}
      trigger="click"
      onOpenChange={setOpen}
      placement="bottom-start"
      crossOffset={-26}
      content={contentEle}
      unmountOnExit={false}
    >
      <Tooltip placement="bottom" title={t('emoji.text')}>
        <button
          className={cls(
            'flex items-center p-4px m-[0_6px] line-height-0 rd-radius-m color-text-1',
            '[@media(hover:hover)]-hover-bg-hover active-bg-active! custom-focus-outline select-none',
            {
              'bg-hover': open,
              'cursor-not-allowed': setEmojiDisabled
            }
          )}
        >
          <HiOutlineEmojiHappy size={18} />
          <BiSolidChevronDown className="color-text-2" size={14} />
        </button>
      </Tooltip>
    </Popover>
  )
}
