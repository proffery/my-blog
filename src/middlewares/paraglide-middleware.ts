import type { AvailableLanguageTag } from '@/paraglide/runtime'

import { MiddlewareFactory } from '@/middlewares/stack-handler'
import * as m from '@/paraglide/messages'
import { Middleware, Navigation, PrefixStrategy } from '@inlang/paraglide-next'
import { NextFetchEvent, NextRequest } from 'next/server'

export const paraglideMiddleware: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    export const strategy = PrefixStrategy<AvailableLanguageTag>()

    export const middleware = Middleware({ strategy })
    export const { Link, permanentRedirect, redirect, usePathname, useRouter } = Navigation({
      strategy,
    })

    return next(request, _next)
  }
}
