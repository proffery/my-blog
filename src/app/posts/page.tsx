'use client'
import { ChangeEvent, useState } from 'react'

import { GetUserParams } from '@/app/api/users/user/[userId]/route'
import { postsFilters } from '@/app/posts/posts-filters'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { endpoints } from '@/common/constants/endpoints'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { TabGroup, TabItem, TabList } from '@/components/ui/tab-switcher/tab-switcher'
import { Typography } from '@/components/ui/typography/typography'
import { getData } from '@/server/utils/get-data'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetPostsQuery } from '@/services/posts/posts.service'
import { GetUserResponse } from '@/services/users/users.types'
import clsx from 'clsx'
import Link from 'next/link'
import { useDebouncedCallback } from 'use-debounce'

import s from './posts.module.scss'

function Posts() {
  const { search, setSearch, setSortDirection, sortDirection } = postsFilters()

  const classNames = {
    filtersWrapper: clsx(s.filtersWrapper),
    page: clsx(s.page),
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
        <TabGroup label={'Показать посты'} onValueChange={tabChangeHandler}>
          <TabList>
            <TabItem selected={tabValue === 'my'} value={'my'}>
              Мои
            </TabItem>
            <TabItem selected={tabValue === 'all'} value={'all'}>
              Все
            </TabItem>
          </TabList>
        </TabGroup>
        <Label>
          Сначала
          <Button onClick={sortChangeHandler}>
            {sortDirection === 'desc' ? 'Новые' : 'Старые'}
            <RightBracketIcon className={classNames.sortIcon} />
          </Button>
        </Label>
      </div>
      {posts?.length === 0 && <Typography.Caption>Пока нет постов</Typography.Caption>}
      {posts?.map(post => (
        <Typography.Body1 as={Link} href={routes.post + '/' + post.$id} key={'posts' + post.$id}>
          Заголовок: {post.title}
          {' Автор: '}
          <Typography.Subtitle1
            as={Link}
            href={routes.account + '/' + post.authorId}
            key={'posts' + post.$id}
          >
            {post.authorName ?? 'Noname'}
          </Typography.Subtitle1>
        </Typography.Body1>
      ))}
    </Page>
  )
}

export default withRedux(Posts)
