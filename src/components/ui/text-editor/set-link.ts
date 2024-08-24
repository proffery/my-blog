import { Editor } from '@tiptap/react'

function setLink(editor: Editor | null, url: string) {
  // cancelled
  if (url === null || editor === null) {
    return
  }
  // empty
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }
  // update link
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

export { setLink }
