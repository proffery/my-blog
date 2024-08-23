'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef, useRef, useState } from 'react'

import { FieldError } from '@/components/ui/field-error/field-error'
import { Label } from '@/components/ui/label/label'
import { Toolbar } from '@/components/ui/text-editor/toolbar'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import clsx from 'clsx'

import s from './text-editor.module.scss'

type Props = {
  errorMessage?: string
  label?: string
  onChange?: (content: string) => void
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>

export const TextEditor = forwardRef<ElementRef<'div'>, Props>(
  ({ errorMessage, label, onChange, ...rest }: Props, ref) => {
    const classNames = {
      content: clsx(s.content),
      editor: clsx(s.editor),
    }
    const [content, setContent] = useState('')

    const handleContentChange = (newContent: string) => {
      setContent(newContent)
      onChange?.(newContent)
    }
    const editor = useEditor({
      content,
      extensions: [StarterKit, Underline],
      onUpdate: ({ editor }) => {
        handleContentChange(editor.getHTML())
      },
    })

    return (
      <FieldError errorMessage={errorMessage} ref={ref} {...rest}>
        {label && <Label>{label}</Label>}
        <div className={classNames.editor}>
          <Toolbar editor={editor} />
          <EditorContent className={classNames.content} editor={editor} />
        </div>
      </FieldError>
    )
  }
)
