export type ValueOf<T> = T[keyof T]

export type PromiseValue<T extends Promise<unknown>> = T extends Promise<infer R> ? R : never

export type PromiseFnResult<T extends () => Promise<unknown>> = PromiseValue<ReturnType<T>>

export type DeepPartial<T> = Partial<{
	[K in keyof T]: DeepPartial<T[K]>
}>

export type DeepRequired<T> = Required<{
	[K in keyof T]: DeepRequired<T[K]>
}>
