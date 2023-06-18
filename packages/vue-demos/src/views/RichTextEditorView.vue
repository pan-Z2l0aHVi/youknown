<template>
	<div class="rich-text-editor-page">
		<editor-content class="rich-text-container" :editor="editor" />
	</div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import '@/assets/rich-text.scss'
const editor = useEditor({
	content: localStorage.getItem('editorHTML') ?? '',
	extensions: [StarterKit],
	onUpdate({ editor }) {
		localStorage.setItem('editorHTML', editor.getHTML())
	}
})
</script>

<style lang="scss" scoped>
.rich-text-editor-page {
	:deep(.ProseMirror) {
		outline: none;
	}
}
</style>
