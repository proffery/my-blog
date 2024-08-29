import { SortDirection } from '@/app/api/posts/route'
import { useQueryParam } from '@/common/hooks/use-query-params'

export const usePostsFilters = () => {
  const [search, setSearch] = useQueryParam<string>('search', '')
  const [authorId, setAuthorId] = useQueryParam<string>('authorId', '')
  const [sortDirection, setSortDirection] = useQueryParam<SortDirection>('sortDirection', 'desc')

  return {
    authorId,
    search,
    setAuthorId,
    setSearch,
    setSortDirection,
    sortDirection,
  }
}
