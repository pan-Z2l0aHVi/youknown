import { useBoolean } from '@youknown/react-hook/src'
import type { Editor } from '@youknown/react-rte/src'
import { Dialog, Divider, Dropdown, Switch, Toast } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'
import copy from 'copy-to-clipboard'
import hljs from 'highlight.js/lib/core'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuLogOut } from 'react-icons/lu'
import { MdOutlineIosShare } from 'react-icons/md'
import { PiTrashSimpleBold } from 'react-icons/pi'
import { TbChevronRight } from 'react-icons/tb'
import { useParams } from 'react-router-dom'

import type { Doc } from '@/apis/doc'
import { delete_doc } from '@/apis/doc'
import DocOptionsModal from '@/components/doc-options-modal'
import More from '@/components/more'
import { useTransitionNavigate } from '@/hooks/use-transition-navigate'
import { is_dark_theme_getter, useUIStore } from '@/stores'
import { format_time } from '@/utils'
import { download_html, open_html } from '@/utils/exports'
import { with_api } from '@/utils/request'
interface DocOptionsDropdownProps {
  doc_id: string
  doc_info?: Doc
  editor: Editor
  is_fixed_width: boolean
  set_is_fixed_width: Dispatch<SetStateAction<boolean>>
  on_updated: (doc: Doc) => void
}
export default function DocOptionsDropdown(props: DocOptionsDropdownProps) {
  const { doc_id, doc_info, is_fixed_width, editor, on_updated, set_is_fixed_width } = props
  const text_len = editor.storage.characterCount.characters()

  const { t } = useTranslation()
  const navigate = useTransitionNavigate()
  const { space_id } = useParams()
  const is_dark_theme = useUIStore(is_dark_theme_getter)
  const is_mobile = useUIStore(state => state.is_mobile)
  const [doc_options_modal_open, { setTrue: show_doc_options_modal, setFalse: hide_doc_options_modal }] =
    useBoolean(false)
  const [deleting, set_deleting] = useState(false)

  const go_doc_list = () => {
    navigate(`/library/${space_id}`)
  }

  const remove_doc = async () => {
    if (deleting) return
    set_deleting(true)
    const [err] = await with_api(delete_doc)({ doc_ids: [doc_id] })
    set_deleting(false)
    if (err) {
      return
    }
    Toast.success(t('doc.delete.success'))
    go_doc_list()
  }

  const show_doc_delete_dialog = () => {
    Dialog.confirm({
      title: t('heading.delete_doc'),
      content: t('doc.delete_tip'),
      overlayClassName: cls(
        'backdrop-blur-xl',
        is_dark_theme ? '!bg-[rgba(0,0,0,0.2)]' : '!bg-[rgba(255,255,255,0.2)]'
      ),
      okDanger: true,
      okText: t('delete.text'),
      cancelText: t('cancel.text'),
      closeIcon: null,
      okLoading: deleting,
      onOk: remove_doc
    })
  }

  const copy_share_url = () => {
    copy(
      QS.stringify({
        base: `${window.location.origin}/browse/feed-detail`,
        query: {
          feed_id: doc_id
        }
      })
    )
    Toast.success(t('copy.share_link.success'))
  }

  const get_highlighted_html = () => {
    const temp_div = document.createElement('div')
    temp_div.innerHTML = editor.getHTML()

    const code_blocks = temp_div.querySelectorAll<HTMLElement>('pre>code')
    code_blocks.forEach(code_block => {
      hljs.highlightElement(code_block)
    })

    const highlighted_html = temp_div.innerHTML
    return highlighted_html
  }
  const get_html_body_str = () => {
    const html_content = document.documentElement.outerHTML
    const html = html_content.replace(
      /<body.*?>[\s\S]*?<\/body>/i,
      `<body>
				<article class="rich-text-container max-w-720px p-[8px_8px_8px_16px] m-[0_auto]">
					<h1 class="text-center">${doc_info?.title ?? ''}</h1>
					${doc_info?.cover ? `<img class="w-100% aspect-ratio-16/9 object-cover b-1 b-solid b-divider rd-radius-m mb-40px" src=${doc_info.cover}>` : ''}
					${get_highlighted_html()}
				</article>
			</body>`
    )
    return html
  }
  const get_title_str = () => {
    return `<script>
				(function(){
          document.title = "${doc_info?.title}"
        })()
			</script>`
  }
  const get_theme_script_str = () => {
    return `<script>
				(function(){
          const root = document.querySelector(':root')
				  root.classList.add('light-theme')
				  root.classList.remove('dark-theme')
        })()
			</script>`
  }
  const get_print_script_str = () => {
    return `<script>
			(function() {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        window.addEventListener("afterprint", function() {
          if (isSafari) {
            window.alert("Accomplish.")
          }
          window.close()
        })
        // 等待所有图片加载完成
        const images = document.images
        let loadedImagesCount = 0
        const totalImages = images.length

        if (!totalImages) {
          window.focus()
          window.print()
          return
        }

        for (let i = 0; i < totalImages; i++) {
          images[i].onload = function() {
            loadedImagesCount++;
            if (loadedImagesCount === totalImages) {
              window.focus()
              window.print()
            }
          };
          images[i].onerror = function() {
            // 即使某些图片加载失败，也继续计数
            loadedImagesCount++;
            if (loadedImagesCount === totalImages) {
              window.focus()
              window.print()
            }
          }
        }
      })()
		</script>`
  }

  const on_export_html = () => {
    const html = get_html_body_str() + get_title_str() + get_theme_script_str()
    const filename = doc_info?.title + '.html'
    download_html(html, filename)
    Toast.success(t('export.html.success'))
  }

  const on_export_pdf = () => {
    const html = get_html_body_str() + get_title_str() + get_theme_script_str() + get_print_script_str()
    open_html(html)
  }

  const doc_detail_ele = doc_info ? (
    <>
      <div className="flex items-center justify-between pl-16px pr-16px text-12px color-text-3 line-height-24px select-none">
        <span>{t('doc.words_len')}</span>
        <span className="ml-16px">{text_len}</span>
      </div>
      <div className="flex items-center justify-between pl-16px pr-16px text-12px color-text-3 line-height-24px select-none">
        <span>{t('time.update')}</span>
        <span className="ml-16px">{format_time(doc_info.update_time)}</span>
      </div>
      <div className="flex items-center justify-between pl-16px pr-16px text-12px color-text-3 line-height-24px select-none">
        <span>{t('time.create')}</span>
        <span className="ml-16px">{format_time(doc_info.creation_time)}</span>
      </div>
    </>
  ) : null

  const dropdown_content = (
    <Dropdown.Menu className="min-w-200px max-h-unset!" closeAfterItemClick>
      {is_mobile || (
        <Dropdown.Item
          closeAfterItemClick={false}
          suffix={<Switch className="pointer-events-none" value={is_fixed_width} />}
          onClick={() => set_is_fixed_width(p => !p)}
        >
          {t('doc.fixed_w')}
        </Dropdown.Item>
      )}
      <Dropdown.Item onClick={show_doc_options_modal}>{t('doc.setting')}</Dropdown.Item>
      <Divider size="small" />
      {doc_info?.public && (
        <Dropdown.Item prefix={<MdOutlineIosShare className="text-16px" />} onClick={copy_share_url}>
          {t('share.text')}
        </Dropdown.Item>
      )}
      <Dropdown
        appendTo={null}
        spacing={4}
        placement="left-start"
        content={
          <Dropdown.Menu className="w-120px" closeAfterItemClick>
            <Dropdown.Item onClick={on_export_pdf}>PDF</Dropdown.Item>
            <Dropdown.Item onClick={on_export_html}>HTML</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Dropdown.Item
          closeAfterItemClick={false}
          prefix={<LuLogOut className="text-16px" />}
          suffix={<TbChevronRight className="mr--4px text-16px" />}
        >
          {t('download.to')}
        </Dropdown.Item>
      </Dropdown>
      <Divider size="small" />
      <Dropdown.Item prefix={<PiTrashSimpleBold className="text-16px color-danger" />} onClick={show_doc_delete_dialog}>
        <span className="color-danger">{t('delete.text')}</span>
      </Dropdown.Item>
      <Divider size="small" />
      {doc_detail_ele}
    </Dropdown.Menu>
  )

  return (
    <>
      <Dropdown trigger="click" placement="bottom-end" content={dropdown_content}>
        <More />
      </Dropdown>

      {doc_info && (
        <DocOptionsModal
          open={doc_options_modal_open}
          hide_modal={hide_doc_options_modal}
          doc_info={doc_info}
          on_updated={on_updated}
        />
      )}
    </>
  )
}
