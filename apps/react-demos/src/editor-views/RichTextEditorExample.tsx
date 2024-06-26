import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  Heading,
  Highlight,
  HorizontalRule,
  Image,
  Italic,
  Link,
  loadLanguages,
  OrderedList,
  RTEContent,
  RTEMenuBar,
  Strike,
  Table,
  TextAlign,
  TextColor,
  Underline,
  useRTE
} from '@youknown/react-rte/src'
import { Divider } from '@youknown/react-ui/src'
import { delay } from '@youknown/utils/src'
import { useEffect } from 'react'

let index = -1
export default () => {
  const editor = useRTE({
    extensions: [
      Heading,
      Bold,
      Strike,
      Italic,
      Underline,
      Code,
      Link,
      TextColor,
      Highlight,
      TextAlign,
      Blockquote,
      Image.configure({
        onCustomUpload: async (_, editor) => {
          editor.setEditable(false)
          await delay(Math.random() * 3000)
          editor.setEditable(true)
          index++
          const imgList = [
            'https://cdn.youknown.cc/0_TIpEV0K3CNndMVp3.jpg',
            'https://cdn.youknown.cc/1_8-TebwsnSySykwhgbbXUQQ.jpg',
            'https://cdn.youknown.cc/1_moJeTvW97yShLB7URRj5Kg.png'
          ]
          if (index > imgList.length - 1) {
            index = 0
          }
          return {
            src: imgList[index]
          }
        }
      }),
      Table,
      BulletList,
      OrderedList,
      CodeBlock,
      HorizontalRule
    ],
    placeholder: '请输入',
    content: '```javascript'
  })

  useEffect(() => {
    ;(async () => {
      loadLanguages()
    })()
  }, [])

  return (
    <>
      <RTEMenuBar editor={editor} />
      <Divider size="small" />
      <RTEContent editor={editor} />
    </>
  )
}
