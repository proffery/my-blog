'use client'
import { ChangeEvent, useState } from 'react'

import { usePostsFilters } from '@/app/posts/use-posts-filters'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import withRedux from '@/common/hocs/with-redux'
import withSuspense from '@/common/hocs/with-suspense'
import { Page } from '@/components/layouts/page/page'
import { PostsCard } from '@/components/layouts/posts-card/posts-card'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { TabGroup, TabItem, TabList } from '@/components/ui/tab-switcher/tab-switcher'
import { Typography } from '@/components/ui/typography/typography'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetPostsQuery } from '@/services/posts/posts.service'
import clsx from 'clsx'
import { useDebouncedCallback } from 'use-debounce'

import s from './posts.module.scss'

function Posts() {
  const { search, setSearch, setSortDirection, sortDirection } = usePostsFilters()

  const classNames = {
    filtersWrapper: clsx(s.filtersWrapper),
    page: clsx(s.page),
    posts: clsx(s.posts),
    postsCard: clsx(s.postsCard),
    sortIcon: clsx(s.sortIcon, sortDirection === 'desc' ? s.sortIconDesc : s.sortIconAsc),
  }

  const [searchInput, setSearchInput] = useState(search)

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

  const sortChangeHandler = () => {
    sortDirection === 'desc' ? setSortDirection('asc') : setSortDirection('desc')
  }

  const tabChangeHandler = () => {
    tabValue === 'all' ? setTabValue('my') : setTabValue('all')
  }

  const searchInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const debouncedSearchInputHandler = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, 300)

  return (
    <Page className={classNames.page}>
      <Typography.H1>Посты</Typography.H1>
      <div className={classNames.filtersWrapper}>
        <Input
          label={'Искать в заголовках'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            searchInputChangeHandler(e)
            debouncedSearchInputHandler(e)
          }}
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
          <PostsCard
            className={classNames.postsCard}
            date={post.$createdAt}
            description={post.post}
            key={post.$id}
            postId={post.$id}
            title={post.title}
          />
        ))}
      </div>
    </Page>
  )
}

export default withSuspense(withRedux(Posts))
