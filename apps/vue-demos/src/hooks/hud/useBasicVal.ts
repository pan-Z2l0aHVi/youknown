import { useIntervalFn } from '@vueuse/core'
import { delay } from '@youknown/utils/src'

export interface BasicValOptions {
  val: Ref<number>
  maxVal: Ref<number>
  onFull?: () => void
  onEmpty?: () => void
}

const INTERVAL = 1000
const enum STATE {
  dec = -1,
  freeze = 0,
  inc = 1
}

export function useBasicVal(options: BasicValOptions) {
  const { val, maxVal, onFull, onEmpty } = options

  const state = ref(STATE.inc)

  const { pause, resume } = useIntervalFn(
    () => {
      console.log('steadily', state.value)
      if (state.value === STATE.dec) {
        val.value = Math.max(val.value - 5, 0)
      } else if (state.value === STATE.inc) {
        val.value = Math.min(val.value + 10, 100)
      }
    },
    INTERVAL,
    {
      immediate: false
    }
  )

  const steadilyDec = () => {
    state.value = STATE.dec
    resume()
  }
  const steadilyInc = () => {
    state.value = STATE.inc
    resume()
  }
  const steadilyFreeze = () => {
    state.value = STATE.freeze
    pause()
  }

  const consuming = ref(false)

  watchEffect(() => {
    if (val.value >= maxVal.value) {
      steadilyFreeze()
      onFull?.()
    } else if (val.value <= 0) {
      steadilyInc()
      onEmpty?.()
    }
  })

  const consume = async (sr: number, duration = 0) => {
    if (!duration) {
      steadilyFreeze()
      val.value = Math.max(val.value - sr, 0)
      steadilyInc()
      return
    }
    if (consuming.value) {
      return
    }
    consuming.value = true
    steadilyFreeze()
    val.value = Math.max(val.value - sr, 0)

    await delay(duration)
    consuming.value = false
    steadilyInc()
  }

  return {
    steadilyDec,
    steadilyInc,
    steadilyFreeze,
    consume,
    consuming
  }
}
