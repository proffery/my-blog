import { useState } from 'react'

import { AddLinkForm } from '@/components/forms/add-link-form/add-link-form'
import { AddLinkValues } from '@/components/forms/add-link-form/schema'
import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'
import { setLink } from '@/components/ui/text-editor/set-link'
import { Editor } from '@tiptap/react'
import clsx from 'clsx'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Link,
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
  const previousUrl = editor?.getAttributes('link').href
  const [openLinkModal, setOpenLinkModal] = useState(false)
  const [url, setUrl] = useState('')

  const buttonVariantBold = editor?.isActive('bold') ? 'secondary' : 'primary'
  const buttonVariantLink = editor?.isActive('link') ? 'secondary' : 'primary'
  const buttonVariantRedo = editor?.isActive('redo') ? 'secondary' : 'primary'
  const buttonVariantUndo = editor?.isActive('undo') ? 'secondary' : 'primary'
  const buttonVariantBlockquote = editor?.isActive('blockquote') ? 'secondary' : 'primary'
  const buttonVariantCode = editor?.isActive('code') ? 'secondary' : 'primary'
  const buttonVariantBulletList = editor?.isActive('bulletList') ? 'secondary' : 'primary'
  const buttonVariantOrderedList = editor?.isActive('orderedList') ? 'secondary' : 'primary'
  const buttonVariantHeading1 = editor?.isActive('heading', { level: 1 }) ? 'secondary' : 'primary'
  const buttonVariantHeading2 = editor?.isActive('heading', { level: 2 }) ? 'secondary' : 'primary'
  const buttonVariantHeading3 = editor?.isActive('heading', { level: 3 }) ? 'secondary' : 'primary'
  const buttonVariantHeading4 = editor?.isActive('heading', { level: 4 }) ? 'secondary' : 'primary'
  const buttonVariantItalic = editor?.isActive('italic') ? 'secondary' : 'primary'
  const buttonVariantUnderline = editor?.isActive('underline') ? 'secondary' : 'primary'
  const buttonVariantStrikethrough = editor?.isActive('strikethrough') ? 'secondary' : 'primary'
  const buttonVariantAlignLeft = editor?.isActive({ textAlign: 'left' }) ? 'secondary' : 'primary'
  const buttonVariantAlignRight = editor?.isActive({ textAlign: 'right' }) ? 'secondary' : 'primary'
  const buttonVariantAlignCenter = editor?.isActive({ textAlign: 'center' })
    ? 'secondary'
    : 'primary'
  const buttonVariantAlignJustify = editor?.isActive({ textAlign: 'justify' })
    ? 'secondary'
    : 'primary'

  const handleClickBold = () => editor?.chain().focus().toggleBold().run()
  const handleClickLink = () => {
    if (editor?.isActive('link')) {
      editor?.chain().focus().unsetLink().run()
      setUrl('')
    } else {
      setLink(editor, url)
      setOpenLinkModal(true)
    }
  }
  const handleClickRedo = () => editor?.chain().focus().redo().run()
  const handleClickUndo = () => editor?.chain().focus().undo().run()
  const handleClickBlockquote = () => editor?.chain().focus().toggleBlockquote().run()
  const handleClickCode = () =>
    editor?.isActive('code')
      ? editor?.chain().focus().unsetCode().run()
      : editor?.chain().focus().setCode().run()
  const handleClickBulletList = () => editor?.chain().focus().toggleBulletList().run()
  const handleClickOrderedList = () => editor?.chain().focus().toggleOrderedList().run()
  const handleClickHeading1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
  const handleClickHeading2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
  const handleClickHeading3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run()
  const handleClickHeading4 = () => editor?.chain().focus().toggleHeading({ level: 4 }).run()
  const handleClickItalic = () => editor?.chain().focus().toggleItalic().run()
  const handleClickUnderline = () => editor?.chain().focus().toggleUnderline().run()
  const handleClickStrikethrough = () => editor?.chain().focus().toggleStrike().run()
  const handleClickAlignLeft = () => editor?.chain().focus().setTextAlign('left').run()
  const handleClickAlignRight = () => editor?.chain().focus().setTextAlign('right').run()
  const handleClickAlignCenter = () => editor?.chain().focus().setTextAlign('center').run()

  const handleClickAlignJustify = () => editor?.chain().focus().setTextAlign('justify').run()

  const handleAddLink = (data: AddLinkValues) => {
    setUrl(data.link)
    setOpenLinkModal(false)
    console.log(url)
  }

  if (!editor) {
    return null
  }

  return (
    <div className={classNames.toolbar}>
      <Modal onOpenChange={setOpenLinkModal} open={openLinkModal} title={'Введите ссылку'}>
        <AddLinkForm defaultValue={previousUrl} onSubmit={handleAddLink} />
      </Modal>
      <div className={classNames.toolbarButtons}>
        <Button
          className={classNames.toolbarButton}
          onClick={handleClickBold}
          type={'button'}
          variant={buttonVariantBold}
        >
          <Bold />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickItalic}
          type={'button'}
          variant={buttonVariantItalic}
        >
          <Italic />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickUnderline}
          type={'button'}
          variant={buttonVariantUnderline}
        >
          <Underline />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickStrikethrough}
          type={'button'}
          variant={buttonVariantStrikethrough}
        >
          <Strikethrough />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickAlignLeft}
          type={'button'}
          variant={buttonVariantAlignLeft}
        >
          <AlignLeft />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickAlignRight}
          type={'button'}
          variant={buttonVariantAlignRight}
        >
          <AlignRight />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickAlignCenter}
          type={'button'}
          variant={buttonVariantAlignCenter}
        >
          <AlignCenter />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickAlignJustify}
          type={'button'}
          variant={buttonVariantAlignJustify}
        >
          <AlignJustify />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickHeading1}
          type={'button'}
          variant={buttonVariantHeading1}
        >
          <Heading1 />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickHeading2}
          type={'button'}
          variant={buttonVariantHeading2}
        >
          <Heading2 />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickHeading3}
          type={'button'}
          variant={buttonVariantHeading3}
        >
          <Heading3 />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickHeading4}
          type={'button'}
          variant={buttonVariantHeading4}
        >
          <Heading4 />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickBulletList}
          type={'button'}
          variant={buttonVariantBulletList}
        >
          <List />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickOrderedList}
          type={'button'}
          variant={buttonVariantOrderedList}
        >
          <ListOrdered />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickBlockquote}
          type={'button'}
          variant={buttonVariantBlockquote}
        >
          <Quote />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickCode}
          type={'button'}
          variant={buttonVariantCode}
        >
          <Code />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickLink}
          type={'button'}
          variant={buttonVariantLink}
        >
          <Link />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickUndo}
          type={'button'}
          variant={buttonVariantUndo}
        >
          <Undo />
        </Button>

        <Button
          className={classNames.toolbarButton}
          onClick={handleClickRedo}
          type={'button'}
          variant={buttonVariantRedo}
        >
          <Redo />
        </Button>
      </div>
    </div>
  )
}
