import { routes } from '@/common/constants/routes'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(`${process.env.NEXT_PUBLIC_SESSION_NAME}`)

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(routes.login, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account', '/account/:patch*', '/create-post'],
}
