import { SortDirection } from '@/app/api/posts/posts.types'
import { useQueryParam } from '@/common/hooks/use-query-params'

export const usePostsFilters = () => {
  const [search, setSearch] = useQueryParam<string>('search', '')
  const [page, setPage] = useQueryParam<string>('page', '1')
  const [authorId, setAuthorId] = useQueryParam<string>('authorId', '')
  const [sortDirection, setSortDirection] = useQueryParam<SortDirection>('sortDirection', 'desc')

  return {
    authorId,
    page,
    search,
    setAuthorId,
    setPage,
    setSearch,
    setSortDirection,
    sortDirection,
  }
}
