export type ValueOf<T> = T[keyof T]

export type ArrayItem<T extends any[]> = T extends (infer R)[] ? R : never

export type PromiseValueType<T> = T extends Promise<infer R> ? R : never

export type PromiseFnResult<T extends (...arg: any) => Promise<unknown>> = PromiseValueType<ReturnType<T>>

export type DeepPartial<T> = Partial<{
	[K in keyof T]: DeepPartial<T[K]>
}>

export type DeepRequired<T> = Required<{
	[K in keyof T]: DeepRequired<T[K]>
}>
