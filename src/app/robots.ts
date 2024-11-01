import { routes } from '@/common/constants/routes'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: '/',
        disallow: [
          routes.administrator,
          routes.moderator,
          routes.account,
          routes.login,
          routes.registration,
        ],
        userAgent: '*',
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_HOST_BASE}/sitemap.xml`,
  }
}
