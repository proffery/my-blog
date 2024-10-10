import { FeedbackModel, FeedbacksSortBy } from '@/app/api/feedbacks/feedbacks.types'
import { SortDirection } from '@/app/api/posts/posts.types'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { routes } from '@/common/constants/routes'
import { formatDateLong } from '@/common/utils/format-date-long'
import { Button } from '@/components/ui/button/button'
import { Checkbox } from '@/components/ui/checkbox/checkbox'
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
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useFormatter, useLocale, useTranslations } from 'next-intl'

import s from './admin-feedbacks-table.module.scss'

type AdminFeedbacksTableColumns = {
  key?: FeedbacksSortBy
  title: string
}

type AdminFeedbacks = {
  disabled?: boolean
  feedbacks?: FeedbackModel[]
  onFeedbackDelete: (data: { feedback: string; feedbackId: string }) => void
  onFeedbackOpen: (data: { feedback: string; feedbackId: string }) => void
  onFeedbackPublish: (data: { feedback: string; feedbackId: string }) => void
  onSortByChange: (value: FeedbacksSortBy | null) => void
  onSortChange: (value: SortDirection | null) => void
  sort: SortDirection
  sortBy: FeedbacksSortBy
}

export const AdminFeedbacksTable = ({
  disabled = false,
  feedbacks,
  onFeedbackDelete,
  onFeedbackOpen,
  onFeedbackPublish,
  onSortByChange,
  onSortChange,
  sort,
  sortBy,
}: AdminFeedbacks) => {
  const t = useTranslations('AdministratorPage.AdminTabs.Feedbacks.FeedbacksTable')
  const format = useFormatter()
  const locale = useLocale()

  const columns: AdminFeedbacksTableColumns[] = [
    {
      key: 'isPublished',
      title: t('Columns.Published'),
    },
    {
      key: 'name',
      title: t('Columns.Author'),
    },
    {
      key: 'email',
      title: t('Columns.Email'),
    },
    {
      key: 'message',
      title: t('Columns.Message'),
    },
    {
      key: '$createdAt',
      title: t('Columns.Created'),
    },
    {
      title: t('Columns.Options'),
    },
  ]

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    cell: clsx(s.cell),
    sortIcon: clsx(s.sortIcon, sort === 'desc' ? s.sortIconDesc : s.sortIconAsc),
    tableContainer: clsx(s.tableContainer),
  }

  const feedbackPublishHandler = (feedback: FeedbackModel) => {
    onFeedbackPublish({
      feedback: feedback.message,
      feedbackId: feedback.$id,
    })
  }
  const feedbackDeleteHandler = (feedback: FeedbackModel) => {
    onFeedbackDelete({
      feedback: feedback.message,
      feedbackId: feedback.$id,
    })
  }

  const feedbackOpenHandler = (feedback: FeedbackModel) => {
    onFeedbackOpen({
      feedback: feedback.message,
      feedbackId: feedback.$id,
    })
  }

  const sortToggleHandler = () => {
    sort === 'asc' ? onSortChange('desc') : onSortChange('asc')
  }

  const sortByHandler = (key: FeedbacksSortBy) => {
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
                    onClick={() => sortByHandler(column.key ?? '$createdAt')}
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
          {feedbacks?.map(feedback => (
            <TableRow key={feedback.$id}>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Checkbox
                    checked={feedback.isPublished}
                    disabled={disabled}
                    onCheckedChange={() => feedbackPublishHandler(feedback)}
                  />
                </div>
              </TableBodyCell>
              <TableBodyCell className={classNames.cell}>
                {feedback.authorId ? (
                  <Typography.Link2 as={Link} href={`${routes.account}/${feedback.authorId}`}>
                    {feedback.name}
                  </Typography.Link2>
                ) : (
                  <Typography.Body2 className={classNames.cell}>{feedback.name}</Typography.Body2>
                )}
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Link2 as={Link} href={`mailto:${feedback.email}`}>
                  {feedback.email}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Link2
                  as={'p'}
                  className={classNames.cell}
                  onClick={() => feedbackOpenHandler(feedback)}
                >
                  {feedback.message}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>
                  {formatDateLong(feedback.$createdAt, locale, format)}
                </Typography.Body2>
              </TableBodyCell>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Button
                    disabled={disabled}
                    onClick={() => feedbackDeleteHandler(feedback)}
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
