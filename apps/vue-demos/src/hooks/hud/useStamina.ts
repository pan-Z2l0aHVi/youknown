import { useBasicVal } from './useBasicVal'

export interface StaminaOptions {
  stamina: Ref<number>
  maxStamina: Ref<number>
  onFull?: () => void
  onEmpty?: () => void
}

export function useStamina(options: StaminaOptions) {
  const { stamina, maxStamina, onFull, onEmpty } = options

  const basicValRes = useBasicVal({
    val: stamina,
    maxVal: maxStamina,
    onEmpty,
    onFull
  })

  return {
    ...basicValRes
  }
}
