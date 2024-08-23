import { Button } from '@/components/ui/button/button'
import { Editor } from '@tiptap/react'
import clsx from 'clsx'
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react'

import s from './text-editor.module.scss'

type Props = {
  editor: Editor | null
}

export const Toolbar = ({ editor }: Props) => {
  const classNames = {
    toolbar: clsx(s.toolbar),
    toolbarButton: clsx(s.toolbarButton),
    toolbarButtons: clsx(s.toolbarButtons),
  }

  if (!editor) {
    return null
  }

  return (
    <div className={classNames.toolbar}>
      <div className={classNames.toolbarButtons}>
        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleBold().run()
          }}
          type={'button'}
          variant={editor.isActive('bold') ? 'secondary' : 'primary'}
        >
          <Bold />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleItalic().run()
          }}
          type={'button'}
          variant={editor.isActive('italic') ? 'secondary' : 'primary'}
        >
          <Italic />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleUnderline().run()
          }}
          type={'button'}
          variant={editor.isActive('underline') ? 'secondary' : 'primary'}
        >
          <Underline />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleStrike().run()
          }}
          type={'button'}
          variant={editor.isActive('strikethrough') ? 'secondary' : 'primary'}
        >
          <Strikethrough />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }}
          type={'button'}
          variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'primary'}
        >
          <Heading1 />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          type={'button'}
          variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'primary'}
        >
          <Heading2 />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }}
          type={'button'}
          variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'primary'}
        >
          <Heading3 />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 4 }).run()
          }}
          type={'button'}
          variant={editor.isActive('heading', { level: 4 }) ? 'secondary' : 'primary'}
        >
          <Heading4 />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleBulletList().run()
          }}
          type={'button'}
          variant={editor.isActive('bulletList') ? 'secondary' : 'primary'}
        >
          <List />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleOrderedList().run()
          }}
          type={'button'}
          variant={editor.isActive('orderedList') ? 'secondary' : 'primary'}
        >
          <ListOrdered />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().toggleBlockquote().run()
          }}
          type={'button'}
          variant={editor.isActive('blockquote') ? 'secondary' : 'primary'}
        >
          <Quote />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().setCode().run()
          }}
          type={'button'}
          variant={editor.isActive('code') ? 'secondary' : 'primary'}
        >
          <Code />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().undo().run()
          }}
          type={'button'}
          variant={editor.isActive('undo') ? 'secondary' : 'primary'}
        >
          <Undo />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={() => {
            editor?.chain().focus().redo().run()
          }}
          type={'button'}
          variant={editor.isActive('redo') ? 'secondary' : 'primary'}
        >
          <Redo />
        </Button>
      </div>
    </div>
  )
}
