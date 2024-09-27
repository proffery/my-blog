import { useGetMyAvatarMetaQuery, useMeQuery } from '@/services/auth/auth.service'

export const useInitializeApp = () => {
  const { data: meData } = useMeQuery()

  useGetMyAvatarMetaQuery({
    params: { date: meData?.user?.$createdAt ?? '', userId: meData?.user?.$id ?? '' },
  })

  return { meData }
}
