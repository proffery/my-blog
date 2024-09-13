import { routes } from '@/common/constants/routes'
import { MiddlewareFactory } from '@/middlewares/stack-handler'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export const isUserMiddleware: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const isAuthenticated = request.cookies.get(`${process.env.NEXT_PUBLIC_SESSION_NAME}`)
    const locale = request.cookies.get(`${process.env.NEXT_PUBLIC_LOCALE_COOKIE}`)
    const pathname = request.nextUrl.pathname

    if (
      [
        `/account`,
        `/account/:patch*`,
        `/create-post`,
        `/edit-post`,
        `/edit-post/:patch*`,
        `/moderator`,
      ]?.some(path => pathname.startsWith(path))
    ) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL(`${routes.login}`, request.url))
      }
    }

    return next(request, _next)
  }
}
