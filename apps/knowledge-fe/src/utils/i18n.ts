import resources_to_backend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

const { default: i18next } = await import('i18next')

export const change_lang = (...args: Parameters<typeof i18next.changeLanguage>) => {
	i18next.changeLanguage(...args)
}

i18next
	.use(initReactI18next)
	.use(
		resources_to_backend(async (language: string) => {
			if (language === 'dev') {
				return
			}
			// Why not "locales/${language}.json"?
			// Vite 拼接动态引入monorepo依赖会报错，暂时用不那么优雅的方式处理
			let deps_pkgs: Promise<unknown>[] = []
			if (language === 'en') {
				deps_pkgs = [
					import('@youknown/react-ui/src/locales/en.json').then(res => res.default),
					import('@youknown/react-rte/src/locales/en.json').then(res => res.default)
				]
			} else if (language === 'zh') {
				deps_pkgs = [
					import('@youknown/react-ui/src/locales/zh.json').then(res => res.default),
					import('@youknown/react-rte/src/locales/zh.json').then(res => res.default)
				]
			}
			const pkgs = await Promise.all([
				import(`@/locales/${language}.json`).then(res => res.default),
				...deps_pkgs
			])
			return pkgs.reduce(
				(pre, cur) => ({
					...pre,
					...cur
				}),
				{}
			)
		})
	)
	.init({
		fallbackLng: 'zh',
		debug: import.meta.env.MODE === 'development'
	})
