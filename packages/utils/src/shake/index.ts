const CLASS_NAME = 'global-page-shaking'
const MOTION_NAME = 'strong_shake'

const style = document.createElement('style')
style.innerHTML = `
    @keyframes ${MOTION_NAME} {
      0% { transform: translate(0, 0); }
      10% { transform: translate(-5px, -5px); }
      20% { transform: translate(8px, 3px); }
      30% { transform: translate(-10px, 5px); }
      40% { transform: translate(13px, -3px); }
      50% { transform: translate(-15px, 0); }
      60% { transform: translate(10px, 8px); }
      70% { transform: translate(-5px, -10px); }
      80% { transform: translate(5px, 5px); }
      90% { transform: translate(-3px, -5px); }
      100% { transform: translate(0, 0); }
    }
    .${CLASS_NAME} {
      animation: ${MOTION_NAME} 0.5s infinite;
      overflow: hidden;
    }
  `
document.head.appendChild(style)

let timer = 0

export function shakePage(callback?: () => void, duration = 500) {
  const body = document.body
  body.classList.add(CLASS_NAME)
  clearTimeout(timer)
  timer = window.setTimeout(() => {
    body.classList.remove(CLASS_NAME)
    callback?.()
  }, duration)

  return function stopShakePage() {
    clearTimeout(timer)
    timer = 0
    callback?.()
  }
}
