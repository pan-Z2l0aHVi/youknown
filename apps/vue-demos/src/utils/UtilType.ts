import { Ref } from 'vue'

export type ArrayItem<T extends any[]> = T extends (infer R)[] ? R : never
export type ToValue<T extends Ref> = T extends Ref<infer R> ? R : never
