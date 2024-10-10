import { PostModel, PostsSortBy, SortDirection } from '@/app/api/posts/posts.types'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import defaultImage from '@/assets/images/no-image.svg'
import { routes } from '@/common/constants/routes'
import { formatDateLong } from '@/common/utils/format-date-long'
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

import s from './moderate-posts-table.module.scss'

type ModeratorTableColumns = {
  key?: PostsSortBy
  title: string
}

type ModeratePosts = {
  disabled?: boolean
  onPostDelete: (data: { authorId: string; postId: string; postTitle: string }) => void
  onPostPublish: (data: { authorId: string; postId: string; postTitle: string }) => void
  onSortByChange: (value: PostsSortBy | null) => void
  onSortChange: (value: SortDirection | null) => void
  posts?: PostModel[]
  sort: SortDirection
  sortBy: PostsSortBy
}

export const ModeratePostsTable = ({
  disabled = false,
  onPostDelete,
  onPostPublish,
  onSortByChange,
  onSortChange,
  posts,
  sort,
  sortBy,
}: ModeratePosts) => {
  const t = useTranslations('ModerationPage.PostsTable')
  const format = useFormatter()
  const locale = useLocale()

  const columns: ModeratorTableColumns[] = [
    {
      title: t('Columns.Cover'),
    },
    {
      key: 'title',
      title: t('Columns.Title'),
    },
    {
      key: '$createdAt',
      title: t('Columns.Created'),
    },
    {
      key: '$updatedAt',
      title: t('Columns.Updated'),
    },
    {
      key: 'authorName',
      title: t('Columns.Author'),
    },
    {
      key: 'views',
      title: t('Columns.Views'),
    },
    {
      title: t('Columns.Options'),
    },
  ]

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    cell: clsx(s.cell),
    cover: clsx(s.cover),
    coverCell: clsx(s.coverCell),
    sortIcon: clsx(s.sortIcon, sort === 'desc' ? s.sortIconDesc : s.sortIconAsc),
    tableContainer: clsx(s.tableContainer),
  }

  const postPublishHandler = (post: PostModel) => {
    onPostPublish({
      authorId: post.authorId,
      postId: post.$id,
      postTitle: post.title,
    })
  }
  const postDeleteHandler = (post: PostModel) => {
    onPostDelete({
      authorId: post.authorId,
      postId: post.$id,
      postTitle: post.title,
    })
  }

  const sortToggleHandler = () => {
    sort === 'asc' ? onSortChange('desc') : onSortChange('asc')
  }

  const sortByHandler = (key: PostsSortBy) => {
    key === sortBy ? sortToggleHandler() : onSortByChange(key)
  }

  return (
    <div className={classNames.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column =>
              column.key ? (
                <TableHeadCell key={column.title}>
                  <Button
                    disabled={disabled}
                    onClick={() => sortByHandler(column.key ?? '$updatedAt')}
                    variant={'text'}
                  >
                    <Typography.Subtitle2>{column.title}&nbsp;</Typography.Subtitle2>
                    {column.key === sortBy && <RightBracketIcon className={classNames.sortIcon} />}
                  </Button>
                </TableHeadCell>
              ) : (
                <TableHeadCell key={column.title}>
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
                  height={60}
                  src={post.cover ? post.cover : defaultImage}
                  width={60}
                />
              </TableBodyCell>
              <TableBodyCell className={classNames.cell}>
                <Typography.Link2 as={Link} href={`${routes.post}${post.$id}`}>
                  {post.title}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>
                  {formatDateLong(post.$createdAt, locale, format)}
                </Typography.Body2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>
                  {formatDateLong(post.$updatedAt, locale, format)}
                </Typography.Body2>
              </TableBodyCell>
              <TableBodyCell className={classNames.cell}>
                <Typography.Link2 as={Link} href={`${routes.account}/${post.authorId}`}>
                  {post.authorName}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Typography.Body2>{post.views}</Typography.Body2>
                </div>
              </TableBodyCell>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Button
                    disabled={disabled}
                    onClick={() => postPublishHandler(post)}
                    padding={false}
                    title={t('OptionsButtons.Publish.title')}
                  >
                    <BookCheck />
                  </Button>
                  <Button
                    disabled={disabled}
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
