import { delay } from '@youknown/utils/src'

import { useBasicVal } from './useBasicVal'

export interface HealthOptions {
  health: Ref<number>
  maxHealth: Ref<number>
  onFull?: () => void
  onEmpty?: () => void
}

export function useHealth(options: HealthOptions) {
  const { health, maxHealth, onFull, onEmpty } = options

  const basicValRes = useBasicVal({
    val: health,
    maxVal: maxHealth,
    onEmpty,
    onFull
  })

  const healsVal = ref(0)
  const healsDiff = computed(() => Math.min(healsVal.value, maxHealth.value - health.value))

  const healsing = ref(false)
  const heals = async (val: number, duration = 0) => {
    if (healsing.value) {
      return
    }
    healsing.value = true
    healsVal.value = val
    if (duration) {
      await delay(duration)
    }
    health.value = Math.min(health.value + val, maxHealth.value)
    healsVal.value = 0
    healsing.value = false
  }

  const damage = (val: number) => {
    health.value = Math.max(health.value - val, 0)
  }

  return {
    ...basicValRes,
    heals,
    healsDiff,
    healsing,
    damage
  }
}
