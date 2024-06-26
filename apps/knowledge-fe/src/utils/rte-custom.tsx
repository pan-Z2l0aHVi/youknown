import type { Editor } from '@youknown/react-rte/src'
import type { ImageAttrs } from '@youknown/react-rte/src/extensions/image'
import { Image, Toast } from '@youknown/react-ui/src'

import { upload_cloudflare_r2 } from './cloudflare-r2'
import { compress_image } from './compress'

const { t } = await import('i18next')

export function onCustomUpload(file: File, editor: Editor) {
  return new Promise<ImageAttrs>((resolve, reject) => {
    Image.crop({
      file,
      fileTypeExcludes: ['image/gif'],
      onCancel: reject,
      async onCrop(result) {
        editor.setEditable(false)
        const toast = Toast.info({
          content: t('file.uploading'),
          duration: Infinity
        })
        const on_upload_error = (err: unknown) => {
          toast.close()
          Toast.error(t('upload.img.fail'))
          reject(err)
          editor.setEditable(true)
        }
        try {
          const compressed_file = await compress_image(result, 1600, 1200)
          upload_cloudflare_r2(compressed_file, {
            progress(progress) {
              toast.update({
                content: (
                  <>
                    <span className="color-primary"> {`(${Math.floor(progress.percent)}%)`} </span>
                    {t('file.uploading')}
                  </>
                )
              })
            },
            complete(url) {
              toast.close()
              resolve({ src: url })
              editor.setEditable(true)
            },
            error: on_upload_error
          })
        } catch (err) {
          on_upload_error(err)
        }
      }
    })
  })
}

export function onCustomPaste(editor: Editor, files: File[]) {
  const [file] = files
  if (file) {
    onCustomUpload(file, editor).then(res => {
      editor.chain().focus().setImage(res).setTextSelection(editor.state.selection.to).run()
    })
  }
}

export function onCustomDrop(editor: Editor, files: File[]) {
  const [file] = files
  if (file) {
    onCustomUpload(file, editor).then(res => {
      editor.chain().focus().setImage(res).setTextSelection(editor.state.selection.to).run()
    })
  }
}
