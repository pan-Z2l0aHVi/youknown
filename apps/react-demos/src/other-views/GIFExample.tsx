import { useBoolean, useIntersection } from '@youknown/react-hook/src'
import { Image } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import type { HTMLAttributes } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { parseGIFFrame } from '@/utils/gif'

export default () => {
  return (
    <>
      <GIFLazyImage src="https://cdn.youknown.cc/2854ea38-0dd5-40e4-8552-b0e45c75f72b/asdffd.gif" />
    </>
  )
}

interface GIFLazyImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string
}
function GIFLazyImage(props: GIFLazyImageProps) {
  const { src, ...rest } = props
  const [finalSrc, setFinalSrc] = useState('')
  const [firstFrame, setFirstFrame] = useState('')
  const [playing, { setTrue: startPlay }] = useBoolean(false)

  const fetchGIFFirstFrame = useCallback(async (): Promise<string> => {
    const response = await fetch(src, {
      mode: 'cors',
      credentials: 'omit'
    })
    const buff = await response.arrayBuffer()
    const firstFrameBase64 = await new Promise<string>((resolve, reject) => {
      try {
        parseGIFFrame(buff, (i, base64) => {
          if (!i) {
            resolve(base64)
          }
        })
      } catch (err) {
        reject(err)
      }
    })
    return firstFrameBase64
  }, [src])

  useEffect(() => {
    if (playing) {
      setFinalSrc(src)
    } else {
      setFinalSrc(firstFrame)
    }
  }, [firstFrame, playing, src])

  const containerRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)
  const isIntersection = useIntersection(containerRef)
  useEffect(() => {
    if (!loadedRef.current && isIntersection) {
      fetchGIFFirstFrame()
        .then(base64 => {
          setFirstFrame(base64)
        })
        .catch(err => {
          console.error('get gif first frame error: ', err)
          setFinalSrc(src)
        })
        .finally(() => {
          loadedRef.current = true
        })
    }
  }, [fetchGIFFirstFrame, isIntersection, src])

  return finalSrc ? (
    <div ref={containerRef} className="relative w-max cursor-pointer" onClick={startPlay}>
      <Image loading="lazy" {...rest} src={finalSrc} canPreview={playing} />
      {playing || (
        <div
          className={cls(
            'absolute left-50% top-50% translate-x--50% translate-y--50%',
            'flex justify-center items-center w-40px h-40px bg-[rgba(0,0,0,0.6)] backdrop-blur-xl',
            'color-#fff text-16px font-600 rd-full'
          )}
        >
          GIF
        </div>
      )}
    </div>
  ) : (
    <div ref={containerRef} {...rest}></div>
  )
}
