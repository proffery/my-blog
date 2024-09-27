import { SortDirection } from '@/app/api/posts/posts.types'
import { UsersSortBy } from '@/app/api/users/users.types'
import { useQueryParam } from '@/common/hooks/use-query-params'

export const useUsersFilters = () => {
  const [sort, setSort] = useQueryParam<SortDirection>('sort', 'desc')
  const [sortBy, setSortBy] = useQueryParam<UsersSortBy>('sortBy', '$createdAt')

  return {
    setSort,
    setSortBy,
    sort,
    sortBy,
  }
}
