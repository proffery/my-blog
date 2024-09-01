'use server'
import { createSessionClient } from '@/server/auth-config'
import { logout } from '@/server/functions/auth/logout'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const { authInstance } = await createSessionClient(request)

  try {
    await logout({ authInstance })

    return NextResponse.json({ message: 'Successfully logged out!' })
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
