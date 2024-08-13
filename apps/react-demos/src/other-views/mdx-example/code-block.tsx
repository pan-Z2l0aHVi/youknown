import { useBoolean } from '@youknown/react-hook/src'
import { loadLanguages } from '@youknown/react-rte/src/utils/load-langs'
import { Button, Collapse, Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import copy from 'copy-to-clipboard'
import hljs from 'highlight.js/lib/core'
import type { HTMLAttributes } from 'react'
import { useLayoutEffect, useRef, useState } from 'react'
import { MdCheck, MdOutlineContentCopy } from 'react-icons/md'
import { TbCaretDownFilled } from 'react-icons/tb'

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  language?: string
  code?: string
}
export default function CodeBlock(props: CodeBlockProps) {
  const { className, language = '', code = '', ...rest } = props

  const [expand, { setReverse: toggle_expand }] = useBoolean(false)
  const code_ref = useRef<HTMLElement>(null)
  const [copied, set_copied] = useState(false)
  const timer = useRef(0)
  const update_copy_status = () => {
    set_copied(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      set_copied(false)
    }, 2000)
  }

  useLayoutEffect(() => {
    if (expand) {
      loadLanguages().then(() => {
        if (code_ref.current) {
          hljs.highlightElement(code_ref.current)
        }
      })
    }
  }, [expand, language])

  const caret_icon = (
    <TbCaretDownFilled className="color-text-2" style={{ transform: `rotate(${expand ? -180 : 0}deg)` }} />
  )
  const language_text = <span className="color-text-3 text-12px">{language}</span>

  const action_bar = (
    <div className={cls('flex justify-between items-center p-2px')}>
      <Tooltip title={expand ? '收起' : '展开'}>
        {language ? (
          <Button className="line-height-32px" text prefixIcon={caret_icon} onClick={toggle_expand}>
            {language_text}
          </Button>
        ) : (
          <Button className="line-height-32px" text square onClick={toggle_expand}>
            {caret_icon}
          </Button>
        )}
      </Tooltip>

      <Button
        text
        prefixIcon={copied ? <MdCheck className="color-#00b42a" /> : <MdOutlineContentCopy className="color-text-3" />}
        onClick={() => {
          copy(code)
          update_copy_status()
        }}
      >
        {copied ? (
          <span className="text-12px color-#00b42a">代码已复制</span>
        ) : (
          <span className="text-12px color-text-3">复制代码</span>
        )}
      </Button>
    </div>
  )

  return (
    <div
      className={cls('bg-bg-1 b-1 b-solid b-divider rd-radius-m my-16px', expand && 'shadow-lg', className)}
      {...rest}
    >
      <Collapse.Panel bordered={false} custom={action_bar} expand={expand}>
        <pre className="m-0 b-0!">
          <code className="bg-bg-1!" ref={code_ref}>
            {code}
          </code>
        </pre>
      </Collapse.Panel>
    </div>
  )
}
