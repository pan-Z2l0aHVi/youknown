/**
 * 延时
 */
export function delay(duration = 0): Promise<number> {
  return new Promise(resolve => {
    const timer = window.setTimeout(() => {
      resolve(timer)
    }, duration)
  })
}

export const macroDefer = setTimeout

export const microDefer = Promise.prototype.then.bind(Promise.resolve())

export class ControllableInterval {
  private callback: () => void
  private interval: number
  private timerId: number
  private isPaused: boolean
  private remainingTime: number
  private lastStartTime: number

  constructor(callback: () => void, interval: number) {
    this.callback = callback
    this.interval = interval
    this.timerId = 0
    this.isPaused = false
    this.remainingTime = 0
    this.lastStartTime = 0
  }

  start() {
    if (this.timerId) {
      return
    }
    this.isPaused = false
    this.lastStartTime = Date.now()

    this.timerId = window.setInterval(() => {
      this.lastStartTime = Date.now()
      this.callback()
    }, this.interval)
  }

  pause() {
    if (this.isPaused || !this.timerId) return

    this.isPaused = true
    window.clearInterval(this.timerId)
    this.timerId = 0
    // 计算剩余时间
    this.remainingTime = this.interval - (Date.now() - this.lastStartTime)
  }

  resume() {
    if (!this.isPaused || this.timerId) {
      return
    }
    this.isPaused = false
    // 如果有剩余时间，先等待剩余时间再创建新的定时器
    if (this.remainingTime > 0) {
      window.setTimeout(() => {
        this.callback()
        this.start()
      }, this.remainingTime)
    } else {
      this.start()
    }
  }

  stop() {
    if (this.timerId) {
      window.clearInterval(this.timerId)
    }
    this.timerId = 0
    this.isPaused = false
    this.remainingTime = 0
    this.lastStartTime = 0
  }
}
