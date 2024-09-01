'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect, useState } from 'react'

import { FieldError } from '@/components/ui/field-error/field-error'
import { Label } from '@/components/ui/label/label'
import { Toolbar } from '@/components/ui/text-editor/toolbar'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { Youtube } from '@tiptap/extension-youtube'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import clsx from 'clsx'

import s from './text-editor.module.scss'

import Iframe from './iframe'

type Props = {
  defaultContent?: string
  errorMessage?: string
  isEditable?: boolean
  label?: string
  onChange?: (content: string) => void
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>

export const TextEditor = forwardRef<ElementRef<'div'>, Props>(
  ({ defaultContent, errorMessage, isEditable = true, label, onChange, ...rest }: Props, ref) => {
    const classNames = {
      content: clsx(s.content, !isEditable && s.notEditable),
      editor: clsx(s.editor, !isEditable && s.notEditable),
      image: clsx(s.image),
      tiktok: clsx(s.tiktok),
      youtube: clsx(s.youtube),
    }
    const [content, setContent] = useState(defaultContent ?? '')
    const [editable, setEditable] = useState(isEditable)

    const handleContentChange = (newContent: string) => {
      setContent(newContent)
      onChange?.(newContent)
    }

    const editor = useEditor({
      content,
      editable,
      extensions: [
        StarterKit,
        Image.configure({ HTMLAttributes: { class: classNames.image }, inline: true }),
        Youtube.configure({
          HTMLAttributes: { class: classNames.youtube },
          nocookie: true,
        }),
        Iframe.configure({
          HTMLAttributes: {
            class: classNames.tiktok,
            ['data-tiktok-video']: true,
            draggable: false,
          },
          allowFullscreen: true,
        }),
        Underline,
        Link.configure({
          defaultProtocol: 'https',
          protocols: ['ftp', 'mailto', 'http'],
        }).extend({
          inclusive: false,
        }),
        TextAlign.configure({
          alignments: ['left', 'center', 'right', 'justify'],
          defaultAlignment: 'left',
          types: ['heading', 'paragraph'],
        }),
      ],
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        handleContentChange(editor.getHTML())
      },
    })

    useEffect(() => {
      if (!editor) {
        return undefined
      }

      editor.setEditable(editable)
    }, [editor, editable])

    if (!editor) {
      return null
    }

    return (
      <FieldError errorMessage={errorMessage} ref={ref} {...rest}>
        {label && <Label>{label}</Label>}
        <div className={classNames.editor}>
          {isEditable && <Toolbar editor={editor} />}
          <EditorContent className={classNames.content} editor={editor} />
        </div>
      </FieldError>
    )
  }
)
