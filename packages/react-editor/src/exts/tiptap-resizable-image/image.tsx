import { Component, FC, ReactElement } from 'react'
import { mergeAttributes, nodeInputRule } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ResizableImage from './component/ResizableImage'
import Image from '@tiptap/extension-image'

export interface ImageOptions {
	inline: boolean
	allowBase64: boolean
	HTMLAttributes: Record<string, any>
	resizeIcon: FC | Component | ReactElement
	useFigure: boolean
}
declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		imageResize: {
			setImage: (options: {
				src: string
				alt?: string
				title?: string
				width?: string | number
				height?: string | number
			}) => ReturnType
		}
	}
}
export const inputRegex = /(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/
export const ImageResize = Image.extend<ImageOptions>({
	name: 'imageResize',
	addOptions() {
		return {
			inline: false,
			allowBase64: false,
			HTMLAttributes: {},
			resizeIcon: <>⊙</>,
			useFigure: false
		}
	},
	addAttributes() {
		return {
			src: {
				default: null
			},
			alt: {
				default: null
			},
			title: {
				default: null
			},
			width: {
				default: '100%'
			},
			height: {
				default: 'auto'
			}
		}
	},
	parseHTML() {
		return [
			{
				tag: 'image-resizer'
			}
		]
	},

	renderHTML({ HTMLAttributes }) {
		return ['image-resizer', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
	},

	addNodeView() {
		return ReactNodeViewRenderer(ResizableImage)
	},
	addInputRules() {
		return [
			nodeInputRule({
				find: inputRegex,
				type: this.type,
				getAttributes: match => {
					const [, , alt, src, title, height, width] = match
					return { src, alt, title, height, width }
				}
			})
		]
	}
})
