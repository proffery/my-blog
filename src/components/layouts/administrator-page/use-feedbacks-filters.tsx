import { FeedbacksSortBy } from '@/app/api/feedbacks/feedbacks.types'
import { SortDirection } from '@/app/api/posts/posts.types'
import { useQueryParam } from '@/common/hooks/use-query-params'
import { Locale, defaultLocale } from '@/i18n/config'

export const useFeedbacksFilters = () => {
  const [sort, setSort] = useQueryParam<SortDirection>('sort', 'desc')
  const [sortBy, setSortBy] = useQueryParam<FeedbacksSortBy>('sortBy', '$createdAt')
  const [locale, setLocale] = useQueryParam<Locale>('locale', defaultLocale)

  return {
    locale,
    setLocale,
    setSort,
    setSortBy,
    sort,
    sortBy,
  }
}
