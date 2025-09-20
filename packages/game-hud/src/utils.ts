import { unref, UnwrapRef } from 'vue'

/**
 * 仅解包对象第一层的 Ref/ComputedRef（完全对应 toRefs 的反向操作）
 * 不处理嵌套对象，和 toRefs 的“非递归”特性一致
 */
export function unRefs<T extends object>(obj: T) {
  type Result = {
    [K in keyof T]: UnwrapRef<T[K]>
  }
  const result = {} as Result
  Object.entries(obj).forEach(([key, value]) => {
    result[key as keyof T] = unref(value)
  })
  return result
}
