import { createSessionClient } from '@/server/auth-config'
import { me } from '@/server/functions/auth/me'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { authInstance } = await createSessionClient(request)

  try {
    const user = await me({ authInstance })

    return NextResponse.json({ user })
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
