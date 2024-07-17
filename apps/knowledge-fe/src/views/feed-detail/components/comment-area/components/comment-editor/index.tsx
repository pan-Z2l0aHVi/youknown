import { useUpdate } from '@youknown/react-hook/src'
import { RTEMenuBar } from '@youknown/react-rte/src/components/menu-bar'
import { RTEContent } from '@youknown/react-rte/src/components/rich-text-content'
import { useRTE } from '@youknown/react-rte/src/hooks/useRTE'
import { Avatar, Button, Space } from '@youknown/react-ui/src'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useModalStore, useUIStore, useUserStore } from '@/stores'
import { transform_img_cdn } from '@/utils/cloudflare'
import { COMMENT_EDITOR_KIT } from '@/utils/rte-kit'

import EmojiPicker from '../emoji-picker'

interface CommentEditorProps {
  auto_focus?: boolean
  send_loading?: boolean
  placeholder?: string
  btnText?: ReactNode
  avatar_visible?: boolean
  value: string
  on_change: (value: string) => void
  on_send: (value: string) => void
  on_cancel?: () => void
}

export default function CommentEditor(props: CommentEditorProps) {
  const {
    send_loading = false,
    auto_focus = false,
    avatar_visible = false,
    placeholder = '',
    btnText,
    value,
    on_change,
    on_send,
    on_cancel
  } = props

  const { t } = useTranslation()
  const update = useUpdate()
  const is_mobile = useUIStore(state => state.is_mobile)
  const profile = useUserStore(state => state.profile)
  const has_login = useUserStore(state => state.has_login)
  const open_login_modal = useModalStore(state => state.open_login_modal)

  const editor = useRTE({
    extensions: COMMENT_EDITOR_KIT,
    autofocus: auto_focus ? 'end' : false,
    placeholder: () => placeholder,
    content: value,
    onUpdate({ editor }) {
      on_change(editor.getHTML())
    }
  })

  const handle_send = () => {
    on_send(value)
    on_change('')
    editor?.commands.clearContent()
  }

  useEffect(() => {
    editor?.setEditable(!send_loading)
    update()
  }, [editor, send_loading, update])

  if (!editor) return null

  return (
    <div className="flex items-start mt-8px mb-16px">
      {has_login ? (
        <>
          {avatar_visible && (
            <Avatar
              className="mr-16px"
              size={32}
              round
              src={transform_img_cdn(profile?.avatar, { w: 32, h: 32, fit: 'cover' })}
              previewSrc={profile?.avatar}
            />
          )}
          <div className="flex-1 pt-8px b-1 b-solid b-divider rd-radius-m">
            <div className="pl-8px pr-8px">
              <RTEMenuBar
                editor={editor}
                list={['|', 'heading', 'bold', 'italic', 'underline', 'strike', 'code', '|', 'slot', 'link']}
                insertList={['image', 'blockquote', 'codeBlock']}
              >
                <EmojiPicker editor={editor} />
              </RTEMenuBar>
            </div>
            <RTEContent
              className="comment-rich-text-reset text-14px"
              editor={editor}
              bubble={!is_mobile}
              bubbleList={['bold', 'italic', 'underline', 'strike', 'code', 'link']}
              floating={false}
            />
            <div className="flex justify-end pb-12px pr-12px">
              <Space>
                {on_cancel && (
                  <Button text round onClick={on_cancel}>
                    <span className="color-text-2">{t('cancel.text')}</span>
                  </Button>
                )}
                <Button primary round disabled={editor.isEmpty} loading={send_loading} onClick={handle_send}>
                  {btnText}
                </Button>
              </Space>
            </div>
          </div>
        </>
      ) : (
        <div
          className="flex-1 h-120px flex items-center justify-center bg-bg-2 color-text-3 rd-radius-m cursor-pointer"
          onClick={open_login_modal}
        >
          <span className="color-primary mr-4px">{t('login.text')}</span>
          {t('comment.then_join')}
        </div>
      )}
    </div>
  )
}
