import { onBeforeUnmount, ref, Ref, watchPostEffect } from 'vue'
/**
 * @param target
 */
export default function useIntersection(
	target: Ref<HTMLElement | null>,
	observerInit?: () => IntersectionObserverInit
) {
	let observe: IntersectionObserver | null = null
	const isIntersection = ref(false)
	watchPostEffect(() => {
		if (!target.value) return

		observe?.disconnect()
		observe = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				isIntersection.value = entry.isIntersecting
			})
		}, observerInit?.())
		observe.observe(target.value)
	})

	onBeforeUnmount(() => {
		observe?.disconnect()
	})

	return isIntersection
}
