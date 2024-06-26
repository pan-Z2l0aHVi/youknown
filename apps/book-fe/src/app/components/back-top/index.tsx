import { useDebounce } from '@youknown/react-hook/src'
import { Button, Motion } from '@youknown/react-ui/src'
import { cls, is } from '@youknown/utils/src'
import { useEffect, useState } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'

interface BackTopProps {
  className?: string
  threshold?: number
  container?: Element
}
export default function BackTop(props: BackTopProps) {
  const { className, threshold = window.innerHeight, container = window } = props
  const [visible, setVisible] = useState(false)

  const handle_to_top = () => {
    container?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scroll_handler = useDebounce(() => {
    const scrollContainer = is.window(container) ? document.documentElement : container
    setVisible(scrollContainer.scrollTop > threshold)
  }, 100)

  useEffect(() => {
    container.addEventListener('scroll', scroll_handler, {
      passive: true
    })
    return () => {
      container.removeEventListener('scroll', scroll_handler)
    }
  }, [container, scroll_handler])

  return (
    <Motion.Zoom in={visible} mountOnEnter unmountOnExit>
      <Button
        aria-label="back top"
        circle
        size="large"
        className={cls('shadow-shadow-m', className)}
        onClick={handle_to_top}
      >
        <TbArrowBarToUp className="text-22px" />
      </Button>
    </Motion.Zoom>
  )
}
