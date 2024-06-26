import { Editor, isTextSelection } from '@tiptap/react'

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!
  }

  const gripColumn = container && container.querySelector && container.querySelector('a.grip-column.selected')
  const gripRow = container && container.querySelector && container.querySelector('a.grip-row.selected')

  if (gripColumn || gripRow) {
    return true
  }

  return false
}

export const isTextSelected = ({ editor }: { editor: Editor }) => {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to }
    }
  } = editor

  // Sometime check for `empty` is not enough.
  // Doubleclick an empty paragraph returns a node size of 2.
  // So we check also for an empty text size.
  const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(selection)

  if (empty || isEmptyTextBlock || !editor.isEditable) {
    return false
  }
  return true
}

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = ['horizontalRule', 'image', 'codeBlock']
  return customNodes.some(type => editor.isActive(type)) || isTableGripSelected(node)
}
