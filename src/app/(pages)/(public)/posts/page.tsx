'use client'
import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'

import { PostsSortBy } from '@/app/api/posts/posts.types'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import filtersBackgroundImage from '@/assets/images/posts-page/filters.webp'
import { constants } from '@/common/constants/constants'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import withSuspense from '@/common/hocs/with-suspense'
import { isRole } from '@/common/utils/is-role'
import { Page } from '@/components/layouts/page/page'
import { PostsCard } from '@/components/layouts/posts-page/posts-card/posts-card'
import { TitleWithBackground } from '@/components/layouts/title-with-background/title-with-background'
import { Button } from '@/components/ui/button/button'
import { Dialog } from '@/components/ui/dialog/dialog'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import PaginationComponent from '@/components/ui/pagination/pagination'
import { Select, SelectItem } from '@/components/ui/select/select'
import { TabGroup, TabItem, TabList } from '@/components/ui/tab-switcher/tab-switcher'
import { Typography } from '@/components/ui/typography/typography'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import { useMeQuery } from '@/services/auth/auth.service'
import {
  useDeletePostMutation,
  useGetPostsQuery,
  usePublishPostMutation,
} from '@/services/posts/posts.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { BookX, Edit3, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useDebouncedCallback } from 'use-debounce'

import s from './posts.module.scss'

import { usePostsFilters } from './use-posts-filters'

function Posts() {
  const { page, search, setPage, setSearch, setSort, setSortBy, sort, sortBy } = usePostsFilters()

  const [showFilters, setShowFilters] = useState(false)

  const classNames = {
    adminButtonsWrapper: clsx(s.adminButtonsWrapper),
    cardWrapper: clsx(s.cardWrapper),
    filtersWrapper: clsx(s.filtersWrapper, !showFilters && s.filtersWrapperCollapsed),
    page: clsx(s.page),
    pagination: clsx(s.pagination),
    posts: clsx(s.posts),
    postsCard: clsx(s.postsCard),
    showFiltersIcon: clsx(s.sortIcon, showFilters ? s.sortIconAsc : s.sortIconDesc),
    sortIcon: clsx(s.sortIcon, sort === 'desc' ? s.sortIconDesc : s.sortIconAsc),
    userButtonsWrapper: clsx(s.userButtonsWrapper),
  }

  const locale = useLocale()
  const t = useTranslations('PostsPage')

  const sortByOptions = [
    { label: t('Filters.SortBy.item1'), required: false, value: '$createdAt' },
    { label: t('Filters.SortBy.item2'), required: false, value: '$updatedAt' },
    { label: t('Filters.SortBy.item3'), required: false, value: 'authorName' },
    { label: t('Filters.SortBy.item4'), required: false, value: 'title' },
    { label: t('Filters.SortBy.item5'), required: false, value: 'views' },
  ]

  const [searchInput, setSearchInput] = useState(search)
  const [tabValue, setTabValue] = useState<'all' | 'my'>('all')

  const [tempPostData, setTempPostData] = useState({ postId: '', postTitle: '' })
  const [deleteModal, setDeleteModal] = useState(false)
  const [notPublishModal, setNotPublishModal] = useState(false)

  const userRoles = useSelector(selectUserRole)

  const { data: meData } = useMeQuery()
  const authId = meData?.user?.$id || ''
  const authorId = tabValue === 'all' ? undefined : authId

  const { data: postsData } = useGetPostsQuery({
    authorId,
    locale,
    page: page ?? '1',
    search: search ?? '',
    sort: sort ?? 'desc',
    sortBy: sortBy ?? '$createdAt',
  })
  const posts = postsData?.documents
  const pagesCount = postsData ? Math.ceil(postsData.total / constants.NumberPostsForPagination) : 1

  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation()
  const [changePublish, { isLoading: isPublishLoading }] = usePublishPostMutation()

  const sortChangeHandler = () => {
    sort === 'desc' ? setSort('asc') : setSort('desc')
  }

  const tabChangeHandler = () => {
    tabValue === 'all' ? setTabValue('my') : setTabValue('all')
    setPage('1')
  }

  const searchInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debouncedSearchInputHandler(e.target.value)
    setPage('1')
  }

  const debouncedSearchInputHandler = useDebouncedCallback((value: string) => {
    setSearch(value)
  }, 300)

  const onPageChangeHandler = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page.toString())
  }

  const setDeletedPostDataHandler = (postId: string, postTitle: string) => {
    setTempPostData({ postId, postTitle })
    setDeleteModal(true)
  }

  const setNotPublishPostDataHandler = (postId: string, postTitle: string) => {
    setTempPostData({ postId, postTitle })
    setNotPublishModal(true)
  }

  const confirmPostDeleteHandler = async () => {
    setDeleteModal(false)
    await deletePost({ postId: tempPostData.postId }).unwrap()
    await clearCachesByServerAction(routes.account + '/' + authId)
    await clearCachesByServerAction(routes.base)
    setTempPostData({ postId: '', postTitle: '' })
  }

  const confirmNotPublishHandler = async () => {
    setNotPublishModal(false)
    await changePublish({ isPublished: false, postId: tempPostData.postId }).unwrap()
    await clearCachesByServerAction(routes.base)

    setTempPostData({ postId: '', postTitle: '' })
  }

  return (
    <Page className={classNames.page}>
      <div>
        <Typography.H1>{t('title')}</Typography.H1>
        <Button onClick={() => setShowFilters(!showFilters)} variant={'text'}>
          <Typography.Caption>
            {t('description')}&nbsp;
            <RightBracketIcon className={classNames.showFiltersIcon} />
          </Typography.Caption>
        </Button>
        <div className={classNames.filtersWrapper}>
          <TitleWithBackground
            height={250}
            imageAlt={'Posts filters background'}
            position={'flex-end'}
            src={filtersBackgroundImage}
            width={constants.maxContentWidth}
          >
            <Input
              label={t('Filters.SearchInput.label')}
              onChange={searchInputChangeHandler}
              placeholder={t('Filters.SearchInput.placeholder')}
              value={searchInput ?? ''}
            />
            {userRoles && (
              <TabGroup label={t('Filters.TabSwitcher.label')} onValueChange={tabChangeHandler}>
                <TabList>
                  <TabItem selected={tabValue === 'all'} value={'all'}>
                    {t('Filters.TabSwitcher.item1')}
                  </TabItem>
                  <TabItem selected={tabValue === 'my'} value={'my'}>
                    {t('Filters.TabSwitcher.item2')}
                  </TabItem>
                </TabList>
              </TabGroup>
            )}
            <Select
              defaultValue={sortByOptions[0].value}
              label={t('Filters.SortBy.label')}
              onValueChange={value => setSortBy(value as PostsSortBy)}
              value={sortBy as string}
            >
              {sortByOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <Label>
              {t('Filters.SortButton.label')}
              <Button onClick={sortChangeHandler}>
                {sort === 'desc' ? t('Filters.SortButton.item1') : t('Filters.SortButton.item2')}
                <RightBracketIcon className={classNames.sortIcon} />
              </Button>
            </Label>
          </TitleWithBackground>
        </div>
      </div>
      <Dialog
        cancelText={t('Dialogs.DeletePost.Cancel')}
        confirmText={t('Dialogs.DeletePost.Confirm')}
        onCancel={() => setDeleteModal(false)}
        onConfirm={confirmPostDeleteHandler}
        onOpenChange={setDeleteModal}
        open={deleteModal}
        title={t('Dialogs.DeletePost.title')}
      >
        <Typography.Body1>{tempPostData.postTitle}</Typography.Body1>
      </Dialog>
      <Dialog
        cancelText={t('Dialogs.NotPublish.Cancel')}
        confirmText={t('Dialogs.NotPublish.Confirm')}
        onCancel={() => setNotPublishModal(false)}
        onConfirm={confirmNotPublishHandler}
        onOpenChange={setNotPublishModal}
        open={notPublishModal}
        title={t('Dialogs.NotPublish.title')}
      >
        <Typography.Body1>{tempPostData.postTitle}</Typography.Body1>
      </Dialog>

      <div className={classNames.posts}>
        {posts?.length === 0 && <Typography.Caption>{t('Posts.Description')}</Typography.Caption>}
        {posts?.map(post => (
          <div className={classNames.cardWrapper} key={post.$id}>
            {userRoles && authId === post.authorId && (
              <div className={classNames.userButtonsWrapper}>
                <Button
                  as={Link}
                  href={routes.updatePost + post.$id}
                  padding={false}
                  title={t('Posts.CardButtons.Edit.title')}
                >
                  <Edit3 />
                </Button>
                <Button
                  disabled={isDeleteLoading}
                  onClick={() => setDeletedPostDataHandler(post.$id, post.title)}
                  padding={false}
                  title={t('Posts.CardButtons.Delete.title')}
                >
                  <Trash2 />
                </Button>
              </div>
            )}
            {isRole(userRoles, 'Moderator') && (
              <div className={classNames.adminButtonsWrapper}>
                <Button
                  disabled={isPublishLoading}
                  onClick={() => setNotPublishPostDataHandler(post.$id, post.title)}
                  padding={false}
                  title={t('Posts.CardButtons.NotPublish.title')}
                >
                  <BookX />
                </Button>
              </div>
            )}
            <PostsCard postData={post} />
          </div>
        ))}
      </div>
      <div className={classNames.pagination}>
        <PaginationComponent
          count={pagesCount}
          onChange={onPageChangeHandler}
          page={Number(page) ?? 1}
        />
      </div>
    </Page>
  )
}

export default withSuspense(withRedux(Posts))
