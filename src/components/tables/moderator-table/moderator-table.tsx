import { Post, SortBy, SortDirection } from '@/app/api/posts/posts.types'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import cover from '@/assets/images/no-image.svg'
import { routes } from '@/common/constants/routes'
import { dateFullToLocalRu } from '@/common/utils/date-full-to-local-ru'
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

import s from './moderator-table.module.scss'

type ModeratorTableColumns = {
  isClickable: boolean
  key?: SortBy
  title: string
}

const columns: ModeratorTableColumns[] = [
  {
    isClickable: false,
    title: 'Обложка',
  },
  {
    isClickable: true,
    key: 'title',
    title: 'Заголовок',
  },
  {
    isClickable: true,
    key: '$createdAt',
    title: 'Создан',
  },
  {
    isClickable: true,
    key: '$updatedAt',
    title: 'Изменен',
  },
  {
    isClickable: true,
    key: 'authorName',
    title: 'Автор',
  },
  {
    isClickable: false,
    title: 'Опции',
  },
]

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
                    {column.title}&nbsp;
                    {column.key === sortBy && <RightBracketIcon className={classNames.sortIcon} />}
                  </Button>
                </TableHeadCell>
              ) : (
                <TableHeadCell key={column.key}>{column.title}</TableHeadCell>
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
                  src={post.cover ? post.cover : cover}
                />
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Link2 as={Link} href={`${routes.post}/${post.$id}`}>
                  {post.title}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>{dateFullToLocalRu(post.$createdAt)}</Typography.Body2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>{dateFullToLocalRu(post.$updatedAt)}</Typography.Body2>
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
                    title={'Публиковать'}
                  >
                    <BookCheck />
                  </Button>
                  <Button onClick={() => postDeleteHandler(post)} padding={false} title={'Удалить'}>
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
