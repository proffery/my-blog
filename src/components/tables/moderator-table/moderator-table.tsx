import { Post, SortBy, SortDirection } from '@/app/api/posts/posts.types'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { routes } from '@/common/constants/routes'
import { Button } from '@/components/ui/button/button'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import { BookCheck, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useFormatter, useLocale, useTranslations } from 'next-intl'

import s from './moderator-table.module.scss'

type ModeratorTableColumns = {
  isClickable: boolean
  key?: SortBy
  title: string
}

type ModeratorTableProps = {
  onPostDelete: (data: { authorId: string; postId: string; postTitle: string }) => void
  onPostPublish: (data: { authorId: string; postId: string; postTitle: string }) => void
  onSortByChange: (value: SortBy | null) => void
  onSortChange: (value: SortDirection | null) => void
  posts?: Post[]
  sort: SortDirection
  sortBy: SortBy
}

export const ModeratorTable = ({
  onPostDelete,
  onPostPublish,
  onSortByChange,
  onSortChange,
  posts,
  sort,
  sortBy,
}: ModeratorTableProps) => {
  const t = useTranslations('ModerationPage.Table')
  const format = useFormatter()
  const locale = useLocale()

  const columns: ModeratorTableColumns[] = [
    {
      isClickable: false,
      title: t('Columns.Cover'),
    },
    {
      isClickable: true,
      key: 'title',
      title: t('Columns.Title'),
    },
    {
      isClickable: true,
      key: '$createdAt',
      title: t('Columns.Created'),
    },
    {
      isClickable: true,
      key: '$updatedAt',
      title: t('Columns.Updated'),
    },
    {
      isClickable: true,
      key: 'authorName',
      title: t('Columns.Author'),
    },
    {
      isClickable: false,
      title: t('Columns.Options'),
    },
  ]

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    cover: clsx(s.cover),
    coverCell: clsx(s.coverCell),
    sortIcon: clsx(s.sortIcon, sort === 'desc' ? s.sortIconDesc : s.sortIconAsc),
    tableContainer: clsx(s.tableContainer),
  }

  const postPublishHandler = (post: Post) => {
    onPostPublish({
      authorId: post.authorId,
      postId: post.$id,
      postTitle: post.title,
    })
  }
  const postDeleteHandler = (post: Post) => {
    onPostDelete({
      authorId: post.authorId,
      postId: post.$id,
      postTitle: post.title,
    })
  }

  const sortToggleHandler = () => {
    sort === 'asc' ? onSortChange('desc') : onSortChange('asc')
  }

  const sortByHandler = (key: SortBy) => {
    key === sortBy ? sortToggleHandler() : onSortByChange(key)
  }

  const formatDateHandler = (postDate: string) => {
    const dateTime = new Date(postDate)

    return format.dateTime(dateTime, {
      day: 'numeric', // Day of the month
      hour: '2-digit', // Two-digit hour
      hour12: locale !== 'ru', // 24-hour format
      minute: '2-digit', // Two-digit minute
      month: 'short', // Full month [name]
      second: '2-digit', // Two-digit second
      year: 'numeric', // Full year
    })
  }

  return (
    <div className={classNames.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column =>
              column.isClickable ? (
                <TableHeadCell key={column.title}>
                  <Button
                    onClick={() => sortByHandler(column.key ?? '$updatedAt')}
                    variant={'text'}
                  >
                    <Typography.Subtitle2>{column.title}&nbsp;</Typography.Subtitle2>
                    {column.key === sortBy && <RightBracketIcon className={classNames.sortIcon} />}
                  </Button>
                </TableHeadCell>
              ) : (
                <TableHeadCell key={column.key}>
                  <Typography.Subtitle2>{column.title}</Typography.Subtitle2>
                </TableHeadCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {posts?.map(post => (
            <TableRow key={post.$id}>
              <TableBodyCell className={classNames.coverCell}>
                <Image
                  alt={post.title}
                  className={classNames.cover}
                  height={32}
                  src={post.cover ? post.cover : '/images/no-image.svg'}
                  width={32}
                />
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Link2 as={Link} href={`${routes.post}${post.$id}`}>
                  {post.title}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>{formatDateHandler(post.$createdAt)}</Typography.Body2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>{formatDateHandler(post.$updatedAt)}</Typography.Body2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Link2 as={Link} href={`${routes.account}/${post.authorId}`}>
                  {post.authorName}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Button
                    onClick={() => postPublishHandler(post)}
                    padding={false}
                    title={t('OptionsButtons.Publish.title')}
                  >
                    <BookCheck />
                  </Button>
                  <Button
                    onClick={() => postDeleteHandler(post)}
                    padding={false}
                    title={t('OptionsButtons.Delete.title')}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
