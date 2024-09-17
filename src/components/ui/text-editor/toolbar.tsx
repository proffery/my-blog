import { useState } from 'react'

import { TiktokIcon } from '@/assets/icons/components/tiktok-icon'
import { AddLinkForm, AddLinkValues } from '@/components/forms/add-link-form/add-link-form'
import {
  AddTiktokIdForm,
  AddTiktokIdValues,
} from '@/components/forms/add-tiktok-id-form/add-tiktok-id-form'
import {
  AddYoutubeLinkForm,
  AddYoutubeValues,
} from '@/components/forms/add-youtube-link-form/add-youtube-link-form'
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
  ImagePlus,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
  Youtube,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import s from './text-editor.module.scss'

type Props = {
  editor: Editor | null
}

export const Toolbar = ({ editor }: Props) => {
  const classNames = {
    toolbar: clsx(s.toolbar),
    toolbarButtons: clsx(s.toolbarButtons),
  }

  const t = useTranslations('Components.Editor.Toolbar')

  const previousLinkUrl = editor?.getAttributes('link').href
  const [openLinkModal, setOpenLinkModal] = useState(false)
  const [openImageModal, setOpenImageModal] = useState(false)
  const [openYoutubeModal, setOpenYoutubeModal] = useState(false)
  const [openTiktokModal, setOpenTiktokModal] = useState(false)

  const activeBold = editor?.isActive('bold') ? 'secondary' : 'primary'
  const activeLink = editor?.isActive('link') ? 'secondary' : 'primary'
  const activeYoutube = editor?.isActive('youtube') ? 'secondary' : 'primary'
  const activeImage = editor?.isActive('image') ? 'secondary' : 'primary'
  const activeTiktok = editor?.isActive('iframe') ? 'secondary' : 'primary'
  const activeRedo = editor?.isActive('redo') ? 'secondary' : 'primary'
  const activeUndo = editor?.isActive('undo') ? 'secondary' : 'primary'
  const activeBlockquote = editor?.isActive('blockquote') ? 'secondary' : 'primary'
  const activeCode = editor?.isActive('code') ? 'secondary' : 'primary'
  const activeBulletList = editor?.isActive('bulletList') ? 'secondary' : 'primary'
  const activeOrderedList = editor?.isActive('orderedList') ? 'secondary' : 'primary'
  const activeHeading1 = editor?.isActive('heading', { level: 1 }) ? 'secondary' : 'primary'
  const activeHeading2 = editor?.isActive('heading', { level: 2 }) ? 'secondary' : 'primary'
  const activeHeading3 = editor?.isActive('heading', { level: 3 }) ? 'secondary' : 'primary'
  const activeHeading4 = editor?.isActive('heading', { level: 4 }) ? 'secondary' : 'primary'
  const activeItalic = editor?.isActive('italic') ? 'secondary' : 'primary'
  const activeUnderline = editor?.isActive('underline') ? 'secondary' : 'primary'
  const activeStrikethrough = editor?.isActive('strikethrough') ? 'secondary' : 'primary'
  const activeAlignLeft = editor?.isActive({ textAlign: 'left' }) ? 'secondary' : 'primary'
  const activeAlignRight = editor?.isActive({ textAlign: 'right' }) ? 'secondary' : 'primary'
  const activeAlignCenter = editor?.isActive({ textAlign: 'center' }) ? 'secondary' : 'primary'
  const activeAlignJustify = editor?.isActive({ textAlign: 'justify' }) ? 'secondary' : 'primary'

  const handleBold = () => editor?.chain().focus().toggleBold().run()
  const handleLink = () => {
    if (editor?.isActive('link')) {
      editor?.chain().focus().unsetLink().run()
    } else {
      setOpenLinkModal(true)
    }
  }
  const handleYoutube = () => {
    setOpenYoutubeModal(true)
  }
  const handleImage = () => {
    setOpenImageModal(true)
  }
  const handleTicTok = () => {
    setOpenTiktokModal(true)
  }
  const handleRedo = () => editor?.chain().focus().redo().run()
  const handleUndo = () => editor?.chain().focus().undo().run()
  const handleBlockquote = () => editor?.chain().focus().toggleBlockquote().run()
  const handleCode = () =>
    editor?.isActive('code')
      ? editor?.chain().focus().unsetCode().run()
      : editor?.chain().focus().setCode().run()
  const handleBulletList = () => editor?.chain().focus().toggleBulletList().run()
  const handleOrderedList = () => editor?.chain().focus().toggleOrderedList().run()
  const handleHeading1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
  const handleHeading2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
  const handleHeading3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run()
  const handleHeading4 = () => editor?.chain().focus().toggleHeading({ level: 4 }).run()
  const handleItalic = () => editor?.chain().focus().toggleItalic().run()
  const handleUnderline = () => editor?.chain().focus().toggleUnderline().run()
  const handleStrikethrough = () => editor?.chain().focus().toggleStrike().run()
  const handleAlignLeft = () => editor?.chain().focus().setTextAlign('left').run()
  const handleAlignRight = () => editor?.chain().focus().setTextAlign('right').run()
  const handleAlignCenter = () => editor?.chain().focus().setTextAlign('center').run()
  const handleAlignJustify = () => editor?.chain().focus().setTextAlign('justify').run()

  const handleAddLink = (data: AddLinkValues) => {
    setLink(editor, data.link)
    setOpenLinkModal(false)
  }

  const handleAddYoutube = (data: AddYoutubeValues) => {
    editor?.chain().focus().setYoutubeVideo({ height: 480, src: data.link, width: 640 }).run()
    setOpenYoutubeModal(false)
  }

  const handleAddImage = (data: AddLinkValues) => {
    setOpenImageModal(false)
    editor
      ?.chain()
      .focus()
      .setImage({ src: data.link })
      .selectParentNode()
      .setLink({ href: data.link })
      .run()
  }

  const handleAddTiktok = (data: AddTiktokIdValues) => {
    editor
      ?.chain()
      .focus()
      .setIframe({ src: `https://www.tiktok.com/embed/v3/${data.link}` })
      .run()
    setOpenTiktokModal(false)
  }

  if (!editor) {
    return null
  }

  return (
    <div className={classNames.toolbar}>
      <Modal
        onOpenChange={setOpenLinkModal}
        open={openLinkModal}
        title={t('Dialogs.AddLink.title')}
      >
        <AddLinkForm defaultValue={previousLinkUrl} onSubmit={handleAddLink} />
      </Modal>
      <Modal
        onOpenChange={setOpenImageModal}
        open={openImageModal}
        title={t('Dialogs.AddImage.title')}
      >
        <AddLinkForm defaultValue={previousLinkUrl} onSubmit={handleAddImage} />
      </Modal>
      <Modal
        onOpenChange={setOpenYoutubeModal}
        open={openYoutubeModal}
        title={t('Dialogs.AddYoutube.title')}
      >
        <AddYoutubeLinkForm onSubmit={handleAddYoutube} />
      </Modal>
      <Modal
        onOpenChange={setOpenTiktokModal}
        open={openTiktokModal}
        title={t('Dialogs.AddTiktok.title')}
      >
        <AddTiktokIdForm onSubmit={handleAddTiktok} />
      </Modal>
      <div className={classNames.toolbarButtons}>
        <Button onClick={handleBold} padding={false} type={'button'} variant={activeBold}>
          <Bold />
        </Button>
        <Button onClick={handleItalic} padding={false} type={'button'} variant={activeItalic}>
          <Italic />
        </Button>
        <Button onClick={handleUnderline} padding={false} type={'button'} variant={activeUnderline}>
          <Underline />
        </Button>
        <Button
          onClick={handleStrikethrough}
          padding={false}
          type={'button'}
          variant={activeStrikethrough}
        >
          <Strikethrough />
        </Button>
        <Button onClick={handleAlignLeft} padding={false} type={'button'} variant={activeAlignLeft}>
          <AlignLeft />
        </Button>
        <Button
          onClick={handleAlignRight}
          padding={false}
          type={'button'}
          variant={activeAlignRight}
        >
          <AlignRight />
        </Button>
        <Button
          onClick={handleAlignCenter}
          padding={false}
          type={'button'}
          variant={activeAlignCenter}
        >
          <AlignCenter />
        </Button>
        <Button
          onClick={handleAlignJustify}
          padding={false}
          type={'button'}
          variant={activeAlignJustify}
        >
          <AlignJustify />
        </Button>
        <Button onClick={handleHeading1} padding={false} type={'button'} variant={activeHeading1}>
          <Heading1 />
        </Button>
        <Button onClick={handleHeading2} padding={false} type={'button'} variant={activeHeading2}>
          <Heading2 />
        </Button>
        <Button onClick={handleHeading3} padding={false} type={'button'} variant={activeHeading3}>
          <Heading3 />
        </Button>
        <Button onClick={handleHeading4} padding={false} type={'button'} variant={activeHeading4}>
          <Heading4 />
        </Button>
        <Button
          onClick={handleBulletList}
          padding={false}
          type={'button'}
          variant={activeBulletList}
        >
          <List />
        </Button>
        <Button
          onClick={handleOrderedList}
          padding={false}
          type={'button'}
          variant={activeOrderedList}
        >
          <ListOrdered />
        </Button>
        <Button
          onClick={handleBlockquote}
          padding={false}
          type={'button'}
          variant={activeBlockquote}
        >
          <Quote />
        </Button>
        <Button onClick={handleCode} padding={false} type={'button'} variant={activeCode}>
          <Code />
        </Button>
        <Button onClick={handleLink} padding={false} type={'button'} variant={activeLink}>
          <Link />
        </Button>
        <Button onClick={handleImage} padding={false} type={'button'} variant={activeImage}>
          <ImagePlus />
        </Button>
        <Button onClick={handleYoutube} padding={false} type={'button'} variant={activeYoutube}>
          <Youtube />
        </Button>
        <Button onClick={handleTicTok} padding={false} type={'button'} variant={activeTiktok}>
          <TiktokIcon />
        </Button>
        <Button onClick={handleUndo} padding={false} type={'button'} variant={activeUndo}>
          <Undo />
        </Button>
        <Button onClick={handleRedo} padding={false} type={'button'} variant={activeRedo}>
          <Redo />
        </Button>
      </div>
    </div>
  )
}
