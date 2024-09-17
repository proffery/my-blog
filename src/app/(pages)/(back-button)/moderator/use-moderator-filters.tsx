import { SortBy, SortDirection } from '@/app/api/posts/posts.types'
import { useQueryParam } from '@/common/hooks/use-query-params'

export const useModeratorFilters = () => {
  const [sort, setSort] = useQueryParam<SortDirection>('sort', 'desc')
  const [sortBy, setSortBy] = useQueryParam<SortBy>('sortBy', '$updatedAt')

  return {
    setSort,
    setSortBy,
    sort,
    sortBy,
  }
}
