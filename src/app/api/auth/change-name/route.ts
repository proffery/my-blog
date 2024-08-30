import { createSessionClient } from '@/server/auth-config'
import { changeName } from '@/server/functions/auth/change-name'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { authInstance } = await createSessionClient(request)
  const { name } = await request.json()

  try {
    await changeName({ authInstance, name })

    return NextResponse.json({ message: `Name updated successfully!` })
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
