'use client'
import { ChangeEvent, useState } from 'react'

import { usePostsFilters } from '@/app/posts/use-posts-filters'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import withSuspense from '@/common/hocs/with-suspense'
import { Page } from '@/components/layouts/page/page'
import { PostsCard } from '@/components/layouts/posts-card/posts-card'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Modal } from '@/components/ui/modal/modal'
import { TabGroup, TabItem, TabList } from '@/components/ui/tab-switcher/tab-switcher'
import { Typography } from '@/components/ui/typography/typography'
import { useMeQuery } from '@/services/auth/auth.service'
import { useDeletePostMutation, useGetPostsQuery } from '@/services/posts/posts.service'
import clsx from 'clsx'
import { Edit3, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useDebouncedCallback } from 'use-debounce'

import s from './posts.module.scss'

function Posts() {
  const { search, setSearch, setSortDirection, sortDirection } = usePostsFilters()

  const classNames = {
    cardButtonsWrapper: clsx(s.cardButtonsWrapper),
    cardWrapper: clsx(s.cardWrapper),
    filtersWrapper: clsx(s.filtersWrapper),
    modalButtonsWrapper: clsx(s.modalButtonsWrapper),
    page: clsx(s.page),
    posts: clsx(s.posts),
    postsCard: clsx(s.postsCard),
    sortIcon: clsx(s.sortIcon, sortDirection === 'desc' ? s.sortIconDesc : s.sortIconAsc),
  }

  const [searchInput, setSearchInput] = useState(search)
  const [deletedPostData, setDeletedPostData] = useState({ postId: '', postTitle: '' })
  const [deleteModal, setDeleteModal] = useState(false)
  const [tabValue, setTabValue] = useState<'all' | 'my'>('all')

  const { data: meData } = useMeQuery()
  const authId = meData?.user?.$id || ''
  const authorId = tabValue === 'all' ? undefined : authId

  const { data: postsData } = useGetPostsQuery({
    authorId,
    search: search ?? '',
    sortDirection: sortDirection ?? 'desc',
  })
  const posts = postsData?.documents

  const [deletePost] = useDeletePostMutation()

  const sortChangeHandler = () => {
    sortDirection === 'desc' ? setSortDirection('asc') : setSortDirection('desc')
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

  const setDeletedPostDataHandler = (postId: string, postTitle: string) => {
    setDeletedPostData({ postId, postTitle })
    setDeleteModal(true)
  }

  const confirmPostDeleteHandler = async () => {
    await deletePost({ postId: deletedPostData.postId }).unwrap()
    setDeleteModal(false)
    setDeletedPostData({ postId: '', postTitle: '' })
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>Посты</Typography.H1>
      <Modal onOpenChange={setDeleteModal} open={deleteModal} title={'Удалить этот пост?'}>
        <Typography.H3>{deletedPostData.postTitle}</Typography.H3>
        <div className={classNames.modalButtonsWrapper}>
          <Button onClick={() => setDeleteModal(false)}>Отмена</Button>
          <Button onClick={confirmPostDeleteHandler}>Удалить</Button>
        </div>
      </Modal>
      <div className={classNames.filtersWrapper}>
        <Input
          label={'Искать в заголовках'}
          onChange={searchInputChangeHandler}
          placeholder={'домашний офис'}
          value={searchInput ?? ''}
        />
        {meData && (
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
            {sortDirection === 'desc' ? 'Новые' : 'Старые'}
            <RightBracketIcon className={classNames.sortIcon} />
          </Button>
        </Label>
      </div>
      <div className={classNames.posts}>
        {posts?.length === 0 && <Typography.Caption>Пока нет постов</Typography.Caption>}
        {posts?.map(post => (
          <div className={classNames.cardWrapper} key={post.$id}>
            {authId === post.authorId && (
              <div className={classNames.cardButtonsWrapper}>
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
            <PostsCard
              className={classNames.postsCard}
              date={post.$createdAt}
              description={post.post}
              postId={post.$id}
              title={post.title}
            />
          </div>
        ))}
      </div>
    </Page>
  )
}

export default withSuspense(withRedux(Posts))
