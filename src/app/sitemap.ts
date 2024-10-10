import { GetPostsResponse } from '@/app/api/posts/posts.types'
import { routes } from '@/common/constants/routes'
import { createDatabaseClient } from '@/server/database-config'
import { allPosts } from '@/server/functions/database/posts/all-posts'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { databasesInstance } = await createDatabaseClient()
  const postsData = (await allPosts({ databasesInstance })) as GetPostsResponse

  const postsEntries: MetadataRoute.Sitemap = postsData.documents.map(({ $id, $updatedAt }) => ({
    lastModified: new Date($updatedAt),
    url: `${process.env.NEXT_PUBLIC_HOST_BASE}/post/${$id}`,
  }))

  return [
    {
      url: `${process.env.NEXT_PUBLIC_HOST_BASE}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST_BASE}${routes.posts}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST_BASE}${routes.contacts}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST_BASE}${routes.login}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST_BASE}${routes.registration}`,
    },
    ...postsEntries,
  ]
}
