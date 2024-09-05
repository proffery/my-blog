'use client'
import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'

import { usePostsFilters } from '@/app/posts/use-posts-filters'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { projectConstants } from '@/common/constants/project-constants'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import withSuspense from '@/common/hocs/with-suspense'
import { isRole } from '@/common/utils/is-role'
import { Page } from '@/components/layouts/page/page'
import { PostsCard } from '@/components/layouts/posts-card/posts-card'
import { Button } from '@/components/ui/button/button'
import { Dialog } from '@/components/ui/dialog/dialog'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import PaginationComponent from '@/components/ui/pagination/pagination'
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
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import s from './posts.module.scss'

function Posts() {
  const { page, search, setPage, setSearch, setSort, sort } = usePostsFilters()

  const classNames = {
    adminButtonsWrapper: clsx(s.adminButtonsWrapper),
    cardWrapper: clsx(s.cardWrapper),
    filters: clsx(s.filters),
    filtersWrapper: clsx(s.filtersWrapper),
    page: clsx(s.page),
    pagination: clsx(s.pagination),
    posts: clsx(s.posts),
    postsCard: clsx(s.postsCard),
    sortIcon: clsx(s.sortIcon, sort === 'desc' ? s.sortIconDesc : s.sortIconAsc),
    userButtonsWrapper: clsx(s.userButtonsWrapper),
  }

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
    page: page ?? '1',
    search: search ?? '',
    sort: sort ?? 'desc',
  })
  const posts = postsData?.documents
  const pagesCount = postsData ? Math.ceil(postsData.total / projectConstants.postsPagination) : 1

  const [deletePost] = useDeletePostMutation()
  const [changePublish] = usePublishPostMutation()

  const sortChangeHandler = () => {
    sort === 'desc' ? setSort('asc') : setSort('desc')
  }

  const tabChangeHandler = () => {
    tabValue === 'all' ? setTabValue('my') : setTabValue('all')
  }

  const searchInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debouncedSearchInputHandler(e.target.value)
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
    setTempPostData({ postId: '', postTitle: '' })
  }

  const confirmNotPublishHandler = async () => {
    setNotPublishModal(false)
    await changePublish({ isPublished: false, postId: tempPostData.postId }).unwrap()

    setTempPostData({ postId: '', postTitle: '' })
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>Посты</Typography.H1>
      <Dialog
        cancelText={'Отмена'}
        confirmText={'Удалить'}
        onCancel={() => setDeleteModal(false)}
        onConfirm={confirmPostDeleteHandler}
        onOpenChange={setDeleteModal}
        open={deleteModal}
        title={'Удалить этот пост?'}
      >
        <Typography.Body1>{tempPostData.postTitle}</Typography.Body1>
      </Dialog>
      <Dialog
        cancelText={'Отмена'}
        confirmText={'Не публиковать'}
        onCancel={() => setNotPublishModal(false)}
        onConfirm={confirmNotPublishHandler}
        onOpenChange={setNotPublishModal}
        open={notPublishModal}
        title={'Не публиковать?'}
      >
        <Typography.Body1>{tempPostData.postTitle}</Typography.Body1>
      </Dialog>
      <div className={classNames.filtersWrapper}>
        <Typography.Caption>Поиск постов по фильтрам:</Typography.Caption>
        <div className={classNames.filters}>
          <Input
            label={'Искать в заголовках'}
            onChange={searchInputChangeHandler}
            placeholder={'домашний офис'}
            value={searchInput ?? ''}
          />
          {userRoles && (
            <TabGroup label={'Показать посты'} onValueChange={tabChangeHandler}>
              <TabList>
                <TabItem selected={tabValue === 'all'} value={'all'}>
                  Все
                </TabItem>
                <TabItem selected={tabValue === 'my'} value={'my'}>
                  Мои
                </TabItem>
              </TabList>
            </TabGroup>
          )}
          <Label>
            Сначала
            <Button onClick={sortChangeHandler}>
              {sort === 'desc' ? 'новые' : 'старые'}
              <RightBracketIcon className={classNames.sortIcon} />
            </Button>
          </Label>
        </div>
      </div>
      <div className={classNames.posts}>
        {posts?.length === 0 && <Typography.Caption>Пока нет постов</Typography.Caption>}
        {posts?.map(post => (
          <div className={classNames.cardWrapper} key={post.$id}>
            {userRoles && authId === post.authorId && (
              <div className={classNames.userButtonsWrapper}>
                <Button
                  as={Link}
                  href={routes.updatePost + post.$id}
                  padding={false}
                  title={'Редактировать'}
                >
                  <Edit3 />
                </Button>
                <Button
                  onClick={() => setDeletedPostDataHandler(post.$id, post.title)}
                  padding={false}
                  title={'Удалить'}
                >
                  <Trash2 />
                </Button>
              </div>
            )}
            {isRole(userRoles, 'Moderator') && (
              <div className={classNames.adminButtonsWrapper}>
                <Button
                  onClick={() => setNotPublishPostDataHandler(post.$id, post.title)}
                  padding={false}
                  title={'Убрать из публикации'}
                >
                  <BookX />
                </Button>
              </div>
            )}
            <PostsCard
              authorId={post.authorId}
              authorName={post.authorName}
              className={classNames.postsCard}
              date={post.$createdAt}
              description={post.post}
              imageUrl={post.cover}
              isPublished={post.isPublished}
              postId={post.$id}
              title={post.title}
            />
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
