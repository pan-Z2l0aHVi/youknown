export interface ResourceBarOptions {
  min?: number
  max?: number
  autoRegenRate?: number
  autoRegenCD?: number
  onEmpty?: () => void
  onFull?: () => void
}

export class ResourceBar {
  static DEFAULT_MIN = 0
  static DEFAULT_MAX = 100
  static DEFAULT_AUTO_REGEN_RATE = 0
  static DEFAULT_AUTO_REGEN_INTERVAL = 1000

  min = ResourceBar.DEFAULT_MIN
  max = ResourceBar.DEFAULT_MAX

  autoRegenRate = ResourceBar.DEFAULT_AUTO_REGEN_RATE // 自动恢复速率
  autoRegenCD = ResourceBar.DEFAULT_AUTO_REGEN_INTERVAL // 自动恢复间隔（数值扣除时自动恢复暂停，冷却时间）

  onEmpty?: () => void
  onFull?: () => void

  private _value = this.max
  private _indicator = 0 // 预恢复指示器

  private _incDelayTimers = new Set<number>()
  private _isInAutoRegen = false
  private _autoRegenPending = false
  private _autoRegenCDTimer = 0

  get isEmpty() {
    return this.value <= this.min
  }
  get isFull() {
    return this.value >= this.max
  }
  get value() {
    return Math.max(this.min, Math.min(this._value, this.max))
  }
  set value(val: number) {
    if (val >= this.max) {
      this.onFull?.()
    } else if (val <= this.min) {
      this.onEmpty?.()
    }
    this._value = val
  }
  get indicator() {
    return Math.max(0, Math.min(this._indicator, this.max - this.value))
  }
  set indicator(val) {
    this._indicator = val
  }

  constructor(options?: ResourceBarOptions) {
    this.setOptions(options)
  }

  setOptions(options: ResourceBarOptions = {}) {
    this.autoRegenRate = options.autoRegenRate ?? this.autoRegenRate
    this.autoRegenCD = options.autoRegenCD ?? this.autoRegenCD
    this.min = options.min ?? this.min
    this.max = options.max ?? this.max
    this.onEmpty = options.onEmpty ?? this.onEmpty
    this.onFull = options.onFull ?? this.onFull
  }

  /**
   * @param val 恢复值
   * @param delay 恢复延迟
   */
  inc(val: number, delay = 0) {
    if (!delay) {
      this.value += val
      return
    }

    this.indicator += val
    const timer = window.setTimeout(() => {
      this._incDelayTimers.delete(timer)
      this.indicator -= val
      this.value += val
    }, delay)
    this._incDelayTimers.add(timer)
  }

  dec(val: number) {
    this.stopAutoRegen()
    this.value -= val
    clearTimeout(this._autoRegenCDTimer)
    this._autoRegenCDTimer = window.setTimeout(() => {
      this.startAutoRegen()
    }, this.autoRegenCD)
  }

  /**
   * 持续恢复
   * @param rate 恢复速率（恢复量/每秒）
   * @param duration 剩余持续时间
   * @param shouldAbort 每帧都判断是否要停止
   * @param onEnd 终止回调
   */
  regen(rate: number, duration = Infinity, shouldAbort?: () => boolean, onEnd?: () => void) {
    if (!rate) {
      return
    }
    const startTime = Date.now()
    window.requestAnimationFrame(() => {
      if (this.isFull) {
        onEnd?.()
        return
      }
      const diff = Date.now() - startTime
      const progress = Math.min(diff / 1000, 1)
      const remainingTime = duration - diff
      if (remainingTime <= 0) {
        onEnd?.()
        return
      }
      if (shouldAbort?.()) {
        onEnd?.()
        return
      }
      this.inc(rate * progress)
      this.regen(rate, remainingTime, shouldAbort, onEnd)
    })
  }

  /**
   * 持续扣除
   * @param rate 扣除速率（扣除量/每秒）
   * @param duration 剩余持续时间
   * @param shouldAbort 每帧都判断是否要停止
   * @param onEnd 终止回调
   */
  dot(rate: number, duration = Infinity, shouldAbort?: () => boolean, onEnd?: () => void) {
    if (!rate) {
      return
    }
    const startTime = Date.now()
    window.requestAnimationFrame(() => {
      if (this.isEmpty) {
        onEnd?.()
        return
      }
      const diff = Date.now() - startTime
      const progress = Math.min(diff / 1000, 1)
      const remainingTime = duration - diff
      if (remainingTime <= 0) {
        onEnd?.()
        return
      }
      if (shouldAbort?.()) {
        onEnd?.()
        return
      }
      this.dec(rate * progress)
      this.dot(rate, remainingTime, shouldAbort, onEnd)
    })
  }

  clean() {
    for (const timer of this._incDelayTimers) {
      clearTimeout(timer)
    }
    this._incDelayTimers.clear()
    this.stopAutoRegen()
  }

  startAutoRegen() {
    if (this._isInAutoRegen) {
      return
    }
    this._isInAutoRegen = false
    this._autoRegenPending = false
    this.regen(
      this.autoRegenRate,
      Infinity,
      () => this._autoRegenPending,
      () => {
        this._isInAutoRegen = false
      }
    )
  }

  stopAutoRegen() {
    this._autoRegenPending = true
    this._isInAutoRegen = false
  }
}
